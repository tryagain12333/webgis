<?php 
    include('./connect.php');

    if(isset($_GET['txtmemo'])){
        $txtmemo = strtolower($_GET['txtmemo']);
        
        $query = "SELECT *,st_x(ST_Centroid(geom)) AS x, st_y(ST_Centroid(geom)) AS y FROM public.hc1tr_th_dgn_annotation WHERE txtmemo ILIKE '%$txtmemo%'";
    
        $result = pg_query($conn, $query);
        $i = 0;
        if(pg_num_rows($result) > 0) {
            print("
            <table class='table'>
                <thead>
                    <tr>
                        <th>GID</th>
                        <th>Tên Đảo</th>
                        <th>Cài đặt</th>
                    </tr>
                </thead> 
                <tbody>
            ");
                    while($results = pg_fetch_array($result, null, PGSQL_ASSOC)) {
                        $link = "<button type='button' class='btn btn-info' onclick='di_den_diem(".$results['x'].",".$results['y'].")'>đi đến</button>";

                        print("
                        <tr class='table-dark table-hover'>
                            <td>".$results['gid']."</td>
                            <td>".$results['txtmemo']."</td>
                            <td>".$link."</td>
                        </tr>
                        ");
            }
            print("
            </tbody>
            </table>
            ");
        }else {
            print("Không tìm thấy");
        }
    }else {
        echo "Không tìm thấy";
    }

?>