<aside id="colorlib-hero">
    <div class="flexslider">
        <ul class="slides">
            <li style="background-image: url('https://cafefcdn.com/203337114487263232/2023/2/22/photo-16-1677031123433659871004.jpg');">
                <div class="overlay"></div>

            </li>
            <li style="background-image: url(https://runtogether-image.s3.ap-southeast-1.amazonaws.com/web-banner-images/slide-show-banner-03.jpeg);">
                <div class="overlay"></div>

            </li>
            <li style="background-image: url(https://file.hstatic.net/200000174405/collection/19238246_1997064527179566_5473797071884482645_o_ff15685be80c4d21973dcb914398e04f.jpg);">
                <div class="overlay"></div>

            </li>
        </ul>
    </div>
</aside>


<!-- BANNER QUẢNG CÁO GIÀY -->
<!-- BANNER QUẢNG CÁO GIÀY CÓ HÌNH ẢNH -->




<div class="colorlib-product">
    <div class="container">
        <div class="row">
        <div class="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
                <h2>SẢN PHẨM NỔI BẬT</h2>
            </div>
        </div>
        <?php
 $product=featuredProductsL4();
?>


        <div class="container ">
            <div class="row wrapper-dt">
                <div class="col-12">
                    <div class="row pad-dt">
                        <div class="row pad-dt"><?php while( $row=mysqli_fetch_array($product)){ ?>
                            <div class="col-3 col-dt">
                                <a href="?view=product-detail&id=<?php echo $row['MaSP'] ?>">
                                    <div class="item">
                                        <div class="product-lable">
                                            <?php $price_sale=price_sale($row['MaSP'],$row['DonGia']); if($price_sale < $row['DonGia']) { 
                      echo '<span>Giảm '.number_format( $row['DonGia'] - $price_sale).'đ </span>';}?>
                                        </div>
                                        <div><img src="webroot/image/sanpham/<?php echo $row['AnhNen']; ?>"></div>
                                        <div class="item-name">
                                            <p> <?php echo $row['TenSP']; ?> </p>
                                        </div>
                                        <div class="item-price">
                                            <p> <?php echo number_format($price_sale,0).'đ'; ?> </p>
                                            <h6> <?php if(number_format($row['DonGia']) !== number_format($price_sale)) {echo number_format($row['DonGia']).'đ';} ;  ?>
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                            </div><?php }  ?>
                            <div id="data_sp"></div>
                        </div>
                    </div>
                </div>
                <div id="loading" style="display:none">
                    <img src="webroot/image/loader.gif" alt="Loading..." />
                </div>
            </div>
        </div>

    </div>
</div>
<!-- BANNER QUẢNG CÁO GIÀY TO VÀ NỔI BẬT -->
<section id="promo-banner" class=" text-dark py-4" >
  <div class="container">
    <div class="row align-items-center">
      
      <!-- Phần text -->
      <div class="col-md-8 col-sm-12 mb-3 mb-md-0">
        <h2 class="fw-bold mb-2" style="font-size: 2.5rem;">
          🔥 Giảm giá đến 30% cho tất cả mẫu giày mới nhất mùa này!
        </h2>
        <p class="mb-0 fs-5">
          Nhanh tay đặt hàng để nhận ưu đãi cực hấp dẫn từ BoShop.
        </p>
      </div>
      
      <!-- Phần hình ảnh và nút -->
      <div class="col-md-4 col-sm-12 d-flex align-items-center justify-content-md-end justify-content-sm-start">
        <img src="https://bizweb.dktcdn.net/100/347/092/themes/708609/assets/banner_project_1.jpg?1746355732311" alt="Giày giảm giá" style="height: 120px; margin-right: 20px;">
        <a href="?view=products" class="btn btn-outline-dark btn-lg px-5" style="font-weight: 600;">
          Mua ngay <i class="fas fa-arrow-right ms-2"></i>
        </a>
      </div>
    </div>
  </div>
</section>

<div class="colorlib-product">
    <div class="container">
        <div class="row">
        <div class="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
                <h2>SẢN PHẨM MỚI</h2>
            </div>
        </div>
        <?php
 $product=newsProductsL4();
?>


        <div class="container ">
            <div class="row wrapper-dt">
                <div class="col-12">
                    <div class="row pad-dt">
                        <div class="row pad-dt"><?php while( $row=mysqli_fetch_array($product)){ ?>
                            <div class="col-3 col-dt">
                                <a href="?view=product-detail&id=<?php echo $row['MaSP'] ?>">
                                    <div class="item">
                                        <div class="product-lable">
                                            <?php $price_sale=price_sale($row['MaSP'],$row['DonGia']); if($price_sale < $row['DonGia']) { 
                      echo '<span>Giảm '.number_format( $row['DonGia'] - $price_sale).'đ </span>';}?>
                                        </div>
                                        <div><img src="webroot/image/sanpham/<?php echo $row['AnhNen']; ?>"></div>
                                        <div class="item-name">
                                            <p> <?php echo $row['TenSP']; ?> </p>
                                        </div>
                                        <div class="item-price">
                                            <p> <?php echo number_format($price_sale,0).'đ'; ?> </p>
                                            <h6> <?php if(number_format($row['DonGia']) !== number_format($price_sale)) {echo number_format($row['DonGia']).'đ';} ;  ?>
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                            </div><?php }  ?>
                            <div id="data_sp"></div>
                        </div>
                    </div>
                </div>
                <div id="loading" style="display:none">
                    <img src="webroot/image/loader.gif" alt="Loading..." />
                </div>
            </div>
        </div>

    </div>
</div>
<section class="banner-hero d-flex align-items-center text-white">
  <div class="container text-center">
    <h1 class="banner-title text-white">🔥 Sale Shock - Giảm đến 40% tất cả giày thể thao</h1>
    <p class="banner-subtitle">Nhanh tay chọn mẫu mới nhất, giao hàng toàn quốc!</p>
    <a href="?view=products" class="btn btn-warning btn-lg mt-3">Mua Ngay</a>
  </div>
</section>

<style>
.banner-hero {
  background: url('https://file.hstatic.net/200000410665/collection/banner-giay-the-thao-nam-mulgati_af048b26a2494d1a907c0be001bd8eb0.jpg') center center / cover no-repeat;
  height: 500px;
  position: relative;
}
.banner-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
  z-index: 0;
}
.banner-hero .container {
  position: relative;
  z-index: 1;
}
.banner-title {
  font-weight: 700;
  font-size: 2.5rem;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.7);
}
.banner-subtitle {
  font-size: 1.25rem;
  margin-top: 10px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
}
</style>

<div class="colorlib-product">
    <div class="container">
        <div class="row">
        <div class="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
                <h2>SẢN PHẨM BÁN CHẠY</h2>
            </div>
        </div>
        <?php
 $product=sellingProductsL4();
?>


        <div class="container ">
            <div class="row wrapper-dt">
                <div class="col-12">
                    <div class="row pad-dt">
                        <div class="row pad-dt"><?php while( $row=mysqli_fetch_array($product)){ ?>
                            <div class="col-3 col-dt">
                                <a href="?view=product-detail&id=<?php echo $row['MaSP'] ?>">
                                    <div class="item">
                                        <div class="product-lable">
                                            <?php $price_sale=price_sale($row['MaSP'],$row['DonGia']); if($price_sale < $row['DonGia']) { 
                      echo '<span>Giảm '.number_format( $row['DonGia'] - $price_sale).'đ </span>';}?>
                                        </div>
                                        <div><img src="webroot/image/sanpham/<?php echo $row['AnhNen']; ?>"></div>
                                        <div class="item-name">
                                            <p> <?php echo $row['TenSP']; ?> </p>
                                        </div>
                                        <div class="item-price">
                                            <p> <?php echo number_format($price_sale,0).'đ'; ?> </p>
                                            <h6> <?php if(number_format($row['DonGia']) !== number_format($price_sale)) {echo number_format($row['DonGia']).'đ';} ;  ?>
                                            </h6>
                                        </div>
                                    </div>
                                </a>
                            </div><?php }  ?>
                            <div id="data_sp"></div>
                        </div>
                    </div>
                </div>
                <div id="loading" style="display:none">
                    <img src="webroot/image/loader.gif" alt="Loading..." />
                </div>
            </div>
        </div>

    </div>
</div>
<div class="colorlib-partner">
    <div class="container">
        <div class="row">
            <div class="col-sm-8 offset-sm-2 text-center colorlib-heading colorlib-heading-sm">
                <h2>ĐỐI TÁC TIN CẬY</h2>
            </div>
        </div>

        <div class="row">
            <div class="col-2 partner-col text-center">
                <img src="webroot/image/brand/brand-1.jpg" class="img-fluid" alt="Free html4 bootstrap 4 template">
            </div>
            <div class="col-2 partner-col text-center">
                <img src="webroot/image/brand/brand-2.jpg" class="img-fluid" alt="Free html4 bootstrap 4 template">
            </div>
            <div class="col-2 partner-col text-center">
                <img src="webroot/image/brand/brand-3.jpg" class="img-fluid" alt="Free html4 bootstrap 4 template">
            </div>
            <div class="col-2 partner-col text-center">
                <img src="webroot/image/brand/brand-4.jpg" class="img-fluid" alt="Free html4 bootstrap 4 template">
            </div>
            <div class="col-2 partner-col text-center">
                <img src="webroot/image/brand/brand-5.jpg" class="img-fluid" alt="Free html4 bootstrap 4 template">
            </div>
            <div class="col-2 partner-col text-center">
                <img src="webroot/image/brand/brand-6.png" class="img-fluid" alt="Free html4 bootstrap 4 template">
            </div>
        </div>
    </div>
</div>
<style>
    #promo-banner {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.02em;
}
</style>