//import img from '../../images/icons/map/ic4.png';
//import img from '../../images/logo/lable.png';
//import coords from './coords.json';
import '!file-loader?name=[name].[ext]!./coords.json';

$(document).ready(function(){
    var _data = {
        //polygon
        polygon1: [
            [53.254624,50.229747],
            [53.255216,50.230729],
            [53.25494,50.231244],
            [53.254808,50.231045],
            [53.254895,50.23086],
            [53.25443,50.230074]
        ],
        polygon2: [
            [53.205875,50.213808],
            [53.205895,50.214833],
            [53.205067,50.214892,],
            [53.205057,50.214162],
            [53.205312,50.214141],
            [53.205308,50.213851]
        ]
    };

    //_methods
    var _toggleMapMethods = {
        initToggle: function ($map, $toggle, $tab, $coords1, $coords2) {
            $toggle.on('change', function () {
                var _thisToggle = $(this),
                    coords = [
                        $coords1.join(', '),
                        $coords2.join(', ')
                    ];

                if (_thisToggle.is(':checked')) {
                    _yandexMapMethods.geocoderInit(coords[0], $map);

                    $tab.eq(0).addClass('togglemap__info-inner--active');
                    $tab.eq(1).removeClass('togglemap__info-inner--active');
                } else {
                    _yandexMapMethods.geocoderInit(coords[1], $map);

                    $tab.eq(1).addClass('togglemap__info-inner--active');
                    $tab.eq(0).removeClass('togglemap__info-inner--active');
                }
            });
        }
    };
    var _methods = {
        initInfrastructureToggle: function ($infrastructureBox, $objectManager) {
            $infrastructureBox.each(function () {
                var _thisBox = $(this),
                    btn = _thisBox.find('[data-mapnav-btn]');

                btn.on('click', function () {
                    var _thisBtn = $(this);

                    if (!_thisBtn.is('.mapnav-btn--active')) {
                        var index = _thisBtn.index(),
                            parent = _thisBtn.parents('[data-mapnav]'),
                            siblings = parent.siblings(),
                            eqBtn = siblings.find('[data-mapnav-btn]').eq(index);

                        _methods.toggleInfrastructure (
                            _thisBtn, btn, $objectManager
                        );
                    }
                });
            });
        },
        toggleInfrastructure: function ($btn, $allBtn, $objectManager) {
            var index = $btn.index(),
                parent = $btn.parents('[data-mapnav]'),
                siblings = parent.siblings(),
                eqBtn = siblings.find('[data-mapnav-btn]').eq(index),
                cath = $btn.data('mapnav-btn');

            _methods.toggleInfrastructureBtn($allBtn, $btn, eqBtn);

            $objectManager.setFilter(_yandexMapMethods.filter(cath));
        },
        toggleInfrastructureBtn: function ($allBtn, $btn, $eqBtn) {
            $allBtn.removeClass('mapnav-btn--active');
            $eqBtn.removeClass('mapnav-btn--active');
            $btn.addClass('mapnav-btn--active');
            $eqBtn.addClass('mapnav-btn--active');
        },
    };
    var _itemCounterMethods = {
        elemCounterInit: function ($data, $tab) {
            var data = $data.features;

            $tab.each(function () {
                var _this = $(this),
                    complexName = _this.data('complex'),
                    btn = _this.find('[data-mapnav-btn]');

                    _itemCounterMethods.elemCounterSetValue(data, btn, complexName);
            });
        },
        elemCounterSetValue: function ($data, $allBtn, $complexName) {
            $allBtn.each(function () {
                var _thisBtn = $(this),
                    cath = _thisBtn.data('mapnav-btn'),
                    counter = _thisBtn.find('[data-cathcount]'),
                    _i = 0;

                if (cath !== "full") {
                    for (var item of $data) {
                        if (item.complex === $complexName && item.properties.cath === cath) {
                            _i++;
                        }
                    }
                    counter.text(_i);
                }
            });
        }
    }
    var _yandexMapMethods = {
        init: function ($toggle, $tab, $defaultCoords, $suppCoords, $infrastructureBox) {
            ymaps.ready(init);

            function init() {
                var _map = new ymaps.Map("map", {
                        center: $defaultCoords,
                        zoom: 16,
                        controls: [],
                    }),
                    _collection = {
                        polygon1: _createYandexItemMethods.polygon(_data.polygon1, 'ЖК Орбита'),
                        polygon2: _createYandexItemMethods.polygon(_data.polygon2, 'ЖК Гармония')
                    };

                _yandexMapMethods.settings(_map);
                _yandexMapMethods.mapOffset(_map);
                _yandexMapMethods.addPolygonOnMap(_map, _collection);

                _yandexMapMethods.createObjectManager(_map, $infrastructureBox, $tab);

                _toggleMapMethods.initToggle(
                    _map,
                    $toggle, $tab, $defaultCoords, $suppCoords
                );
            }
        },//- init end
        settings: function ($map) {
            $map.controls.add('zoomControl', { left: 5, top: 5 });
            $map.behaviors.disable('scrollZoom');
        },
        mapOffset: function ($map) {
            var windowWidth = window.innerWidth;
            if (windowWidth > 930.98) {
                var position = $map.getGlobalPixelCenter();
                $map.setGlobalPixelCenter([ position[0] - 300, position[1] ]);
            }
        },
        addPolygonOnMap: function ($map, $collection) {
            var geoPolygonCollection = new ymaps.GeoObjectCollection(),
                toArray = Object.values($collection);

            for (var item of toArray) {
                geoPolygonCollection.add(item);
            }

            $map.geoObjects.add(geoPolygonCollection);
        },
        geocoderInit: function ($coords, $map) {
            var myGeocoder = ymaps.geocode($coords);
            myGeocoder.then(
                function(res) {
                    var coords = res.geoObjects.get(0).geometry.getCoordinates();

                    $map.panTo(coords, {
                        flying: false,
                    }).then(function () {
                        _yandexMapMethods.mapOffset($map);
                    }, function (err) {
                        console.log('yandex map error ' + err);
                    }, this)
                },
                function(err) {
                    console.log('yandex map error');
                }
            );
            return false;
        },
        createObjectManager: function ($map, $infrastructureBox, $tab) {
            var objectManager = new ymaps.ObjectManager({
                clusterize: false,
                geoObjectOpenBalloonOnClick: false,
            });

            $map.geoObjects.add(objectManager);
            objectManager.objects.options.set('preset', 'islands#blueStretchyIcon');

            _yandexMapMethods.ajaxMethods(objectManager, $tab);
            _methods.initInfrastructureToggle($infrastructureBox, objectManager);
        },
        ajaxMethods: function ($objectManager, $tab) {
            $.ajax({
                url: "coords.json"
            }).done(function(data) {
                $objectManager.add(data);
                _itemCounterMethods.elemCounterInit(data, $tab);
            });
        },
        filter: function ($cath) {
            if ($cath === 'full') {
                return false;
            } else {
                var filter = 'properties.cath == "' + $cath + '"';
                return filter;
            }
        },
    };
    var _createYandexItemMethods = {
        placemark: function ($coords, $hint, $balloon) {
            var placemark = new ymaps.Placemark($coords, {
                hintContent: $hint,
                balloonContent: $balloon,
                iconContent: $hint
            }, {
                preset: 'islands#blueStretchyIcon'
                //iconLayout: 'default#imageWithContent',
                //iconImageHref: 'images/lable.png',
                //iconImageSize: [200, 100],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                //iconImageOffset: [-101, -109],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                //iconContentOffset: [15, 15],
                // Макет содержимого.
                //iconContentLayout: MyIconContentLayout,
                //balloon
                /*
                balloonContentSize: [200, 100],
                balloonLayout: "default#imageWithContent",
                balloonImageHref: 'images/lable.png',
                balloonImageOffset: [-99, -104],
                balloonImageSize: [200, 100],
                balloonShadow: false,
                */
            });

            return placemark;
        },
        polygon: function ($layer, $name) {
            var polygon = new ymaps.Polygon([$layer], {
                    hintContent: $name
                }, {
                    fillColor: "#5942B2",
                    strokeColor: "#5942B2",
                    fillOpacity: 0.24565,
                    strokeOpacity: 0.8,
                    strokeWidth: 3,
                });
            return polygon;
        },
    };



    $('[data-infrastructure]').each(function () {
        var _this = $(this),
            _map = _this.find('#map'),
            coords = {
                map1: _map.data('map1'),
                map2: _map.data('map2')
            },

            toggle = _this.find('[data-togglemap]'),
            panel = _this.find('[data-infobox]'),
            info = _this.find('[data-mapnav]');

        if (!_map.length) {
            return;
        }

        _yandexMapMethods.init(toggle, info, coords.map1, coords.map2, panel);
    });
});//end
