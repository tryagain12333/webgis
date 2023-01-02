var di_den_diem;

$('#document').ready(function () {
    // Hiển thị pop-up
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var overlay = new ol.Overlay(
        /** @type {olx.OverlayOptions} */ ({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
            },
        }),
    );

    var shouldUpdate = true;
    var center = [564429.04, 2317738.2];
    var zoom = 16.56631263565161;
    var rotation = 0;

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    // Khai báo bản đồ
    var format = 'image/png';

    // SỬA CÁI NÀY
    var bounds = [-533381.5625,491325.15625,113889.9375,2078508.125];

    // ---------------------------- ĐẤT LIỀN ---------------------------------------------------

    // DẠNG VÙNG (POLYGON)
    var datlien_polygon = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_hc_dgn_polygon',
            },
        }),
    });

    // DẠNG ĐƯỜNG (POLYLINE)
    var datlien_polyline = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_hc_dgn_polyline',
            },
        }),
    });

    // DẠNG ĐIỂM (POLYPOINT)
    var datlien_point = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_hc_dgn_point',
            },
        }),
    });

    // ANOTATION
    var datlien_anotation = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_hc_dgn_annotation',
            },
        }),
    });

    // ---------------------------- BIỂN ĐẢO ---------------------------------------------------

    // DẠNG VÙNG (POLYGON)
    var biendao_polygon = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_th_dgn_polygon',
            },
        }),
    });

    // DẠNG ĐƯỜNG (POLYLINE)
    var biendao_polyline = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_th_dgn_polyline',
            },
        }),
    });
    // DẠNG ĐIỂM (POLYPOINT)
    var biendao_point = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_th_dgn_point',
            },
        }),
    });
    // ANOTATION
    var biendao_anotation = new ol.layer.Image({
        source: new ol.source.ImageWMS({
            ratio: 1,
            // SỬA CÁI NÀY
            url: 'http://localhost:8085/geoserver/bienvahaidao/wms',
            params: {
                FORMAT: format,
                VERSION: '1.1.0',
                STYLES: '',
                // SỬA CÁI NÀY THEO LAYERS CỦA TỪNG DẠNG
                LAYERS: 'bienvahaidao:hc1tr_th_dgn_annotation',
            },
        }),
    });

    // CÁI NÀY KO CẦN SỬA
    var projection = new ol.proj.Projection({
        code: 'EPSG:3405',
        units: 'm',
        axisOrientation: 'neu',
    });

    // CÁI NÀY KO CẦN SỬA
    var view = new ol.View({
        projection: projection,
        center: center,
        zoom: zoom,
        rotation: rotation,
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            datlien_polygon,
            datlien_polyline,
            datlien_point,
            datlien_anotation,

            biendao_polygon,
            biendao_polyline,
            biendao_point,
            biendao_anotation,
        ],
        overlays: [overlay],
        view: view,
    });

    // Highlight đối tượng
    var styles = {
        MultiPolygon: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'white',
                width: 5,
            }),
        }),
    };

    var styleFunction = function (feature) {
        return styles[feature.getGeometry().getType()];
    };

    var vectorLayer = new ol.layer.Vector({
        style: styleFunction,
    });

    map.addLayer(vectorLayer);

    map.getView().fit(bounds, map.getSize());

    //tìm kiếm đối tượng theo URL
    if (window.location.hash !== '') {
        var hash = window.location.hash.replace('#map=', '');
        var parts = hash.split('/');

        if (parts.length === 4) {
            zoom = parseInt(parts[0], 10);
            center = [parseFloat(parts[1]), parseFloat(parts[2])];
            rotation = parseFloat(parts[3]);
        }
    }

    //Hiển thị hoặc ẩn hiện thị các lớp
    function handlerPreviewDatLien() {
        $('#datlien_polygonCheck').change(function () {
            if ($('#datlien_polygonCheck').is(':checked')) {
                datlien_polygon.setVisible(true);
                document.getElementById('img-datlien_polygon').style.visibility = 'visible';
            } else {
                datlien_polygon.setVisible(false);
                document.getElementById('img-datlien_polygon').style.visibility = 'hidden';
            }
        });
        $('#datlien_polylineCheck').change(function () {
            if ($('#datlien_polylineCheck').is(':checked')) {
                datlien_polyline.setVisible(true);
                document.getElementById('img-datlien_polyline').style.visibility = 'visible';
            } else {
                datlien_polyline.setVisible(false);
                document.getElementById('img-datlien_polyline').style.visibility = 'hidden';
            }
        });
        $('#datlien_pointCheck').change(function () {
            if ($('#datlien_pointCheck').is(':checked')) {
                datlien_point.setVisible(true);
                document.getElementById('img-datlien_point').style.visibility = 'visible';
            } else {
                datlien_point.setVisible(false);
                document.getElementById('img-datlien_point').style.visibility = 'hidden';
            }
        });
        $('#datlien_anotationCheck').change(function () {
            if ($('#datlien_anotationCheck').is(':checked')) {
                datlien_anotation.setVisible(true);
                document.getElementById('img-datlien_anotation').style.visibility = 'visible';
            } else {
                datlien_anotation.setVisible(false);
                document.getElementById('img-datlien_anotation').style.visibility = 'hidden';
            }
        });
    }
    function handlerPreviewBienDao() {
        $('#biendao_polygonCheck').change(function () {
            if ($('#biendao_polygonCheck').is(':checked')) {
                biendao_polygon.setVisible(true);
                document.getElementById('img-biendao_polygon').style.visibility = 'visible';
            } else {
                biendao_polygon.setVisible(false);
                document.getElementById('img-biendao_polygon').style.visibility = 'hidden';
            }
        });
        $('#biendao_polylineCheck').change(function () {
            if ($('#biendao_polylineCheck').is(':checked')) {
                biendao_polyline.setVisible(true);
                document.getElementById('img-biendao_polyline').style.visibility = 'visible';
            } else {
                biendao_polyline.setVisible(false);
                document.getElementById('img-biendao_polyline').style.visibility = 'hidden';
            }
        });
        $('#biendao_pointCheck').change(function () {
            if ($('#biendao_pointCheck').is(':checked')) {
                biendao_point.setVisible(true);
                document.getElementById('img-biendao_point').style.visibility = 'visible';
            } else {
                biendao_point.setVisible(false);
                document.getElementById('img-biendao_point').style.visibility = 'hidden';
            }
        });
        $('#biendao_anotationCheck').change(function () {
            if ($('#biendao_anotationCheck').is(':checked')) {
                biendao_anotation.setVisible(true);
                document.getElementById('img-biendao_anotation').style.visibility = 'visible';
            } else {
                biendao_anotation.setVisible(false);
                document.getElementById('img-biendao_anotation').style.visibility = 'hidden';
            }
        });
    }

    handlerPreviewDatLien();
    handlerPreviewBienDao();

    //Click chuột vào ảnh để đổi
    map.on('singleclick', function (evt) {
        content.innerHTML =
            '<span class="badge rounded-pill bg-danger">Loading... please wait... <span class="spinner-border spinner-border-sm text-success" role="status" aria-hidden="true"></span></span>';
        var view = map.getView();
        var viewResolution = view.getResolution();
        // Sa cái trước getSource nếu cần nha
        var source = datlien_polygon.getSource();
        var url = source.getFeatureInfoUrl(evt.coordinate, viewResolution, view.getProjection(), {
            INFO_FORMAT: 'application/json',
            FEATURE_COUNT: 50,
        });
        if (url) {
            $.ajax({
                type: 'POST',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (n) {
                    var content = "<table class='table table-hover'>";
                    for (var i = 0; i < n.features.length; i++) {
                        var feature = n.features[i];
                        var featureAttr = feature.properties;
                        content += `
                                    <thead>
                                        <tr class='table-success'>
                                            <th>Level</th>
                                            <th>Layer</th>
                                        </tr>
                                    </thead> 
                                    <tbody>
                                        <tr class='table-dark table-hover'>
                                            <td>${featureAttr['level']}</td>
                                            <td>${featureAttr['layer']}</td>
                                        </tr>
                                    </tbody>
                                `;
                    }
                    content += '</table>';
                    $('#info').html(content);
                    $('#popup-content').html(content);
                    overlay.setPosition(evt.coordinate);
                    var vectorSource = new ol.source.Vector({
                        features: new ol.format.GeoJSON().readFeatures(n),
                    });
                    vectorLayer.setSource(vectorSource);
                },
            });
        }
    });

    var updatePermalink = function () {
        if (!shouldUpdate) {
            shouldUpdate = true;
            return;
        }

        var center = view.getCenter();
        var hash =
            '#map=' +
            view.getZoom() +
            '/' +
            Math.round(center[0] * 100) / 100 +
            '/' +
            Math.round(center[1] * 100) / 100 +
            '/' +
            view.getRotation();
        var state = {
            zoom: view.getZoom(),
            center: view.getCenter(),
            rotation: view.getRotation(),
        };

        window.history.pushState(state, 'map', hash);
    };

    map.on('moveend', updatePermalink);

    window.addEventListener('popstate', function (event) {
        if (event.state === null) {
            return;
        }

        map.getView().setCenter(event.state.center);
        map.getView().setZoom(event.state.zoom);
        map.getView().setRotation(event.state.rotation);
        shouldUpdate = false;
    });

    di_den_diem = function (x, y) {
        var vi_tri = ol.proj.fromLonLat([x, y], projection);
        view.animate({
            center: vi_tri,
            duration: 1000,
            zoom: 10,
        });
    };
});
