# WebGIS

-   Đây là 1 website bản đồ địa lý sử dụng HTMNL, CSS, JavaScript, PHP và PostgresSQL

## Mô tả

-   Giao diện:

## Các chức năng chính

-   Bật tắt lớp bản đồ
-   Hiển thị thông tin bản đồ khi ấn vào
-   Tìm kiếm

## Bắt đầu

### Yêu cầu

-   [Xampp](https://www.apachefriends.org/download.html)
-   [PostgreSQL](https://www.postgresql.org/download/) và extensions [PostGIS](https://postgis.net/install/)
-   [GeoServer](https://geoserver.org/download/)

### Cài đặt

-   Đưa folder vào htdocs trong Xampp
-   Tạo csdl và đưa file .shp vào postgreSQL
-   Đưa file .sld lên styles vào tạo layers của geoserver
-   Khi mở code lên cần "npm install ol" để cài đặt Open Layers phục vụ cho mở bản đồ lên web

[Tham khảo](https://cuongdx313.wordpress.com/2016/04/07/webgis-voi-geoserver-postgis-openlayer-bai-1-tao-database-voi-postgresql-va-postgis/)

## Hướng dẫn sửa 1 số lỗi

Nếu gặp phải lỗi này:

![Lỗi](/src/img/Error1.png 'Lỗi')

-   Vào xampp chọn config của tomcat chọn **web.xml** gán code sau:
-   Dán vào dưới cái khoanh đỏ này

![Lỗi](/src/img/Screenshot_2.png 'Lỗi')

```xml
    <filter>
        <filter-name>CorsFilter</filter-name>
        <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
        <init-param>
            <param-name>cors.allowed.origins</param-name>
            <param-value>*</param-value>
        </init-param>
        <init-param>
            <param-name>cors.allowed.methods</param-name>
            <param-value>GET,POST,HEAD,OPTIONS,PUT</param-value>
        </init-param>
        <init-param>
            <param-name>cors.allowed.headers</param-name>
            <param-value>Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers</param-value>
        </init-param>
        <init-param>
            <param-name>cors.exposed.headers</param-name>
            <param-value>Access-Control-Allow-Origin,Access-Control-Allow-Credentials</param-value>
        </init-param>
        <init-param>
            <param-name>cors.support.credentials</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>cors.preflight.maxage</param-name>
            <param-value>10</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CorsFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

Để sử dụng được chứng năng tìm kiếm ta cần mở PostgresSQL ở xampp lên

![Lỗi](/src/img/315529214_5664478363600339_8477730918911989211_n.png 'Lỗi')

-   Mở Chrome phục vụ chạy web bằng cách mở CMD lên và chạy đoạn code dưới (Lưu ý: Máy cần cài Chrome)

```sh
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=C:\temp

```
