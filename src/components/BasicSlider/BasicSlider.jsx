import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/parallax";
import * as basicLightbox from "basiclightbox";
import css from './BasicSlider.module.css'
const toShowImgModal = (url) => {
    const instance = basicLightbox.create(`
            <div class="">
                 <img src=${url} width="390px" class="" />
            </div>
        `)
    instance.show()
}

const BasicSlider = ({ photos }) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Parallax]}
            className={css.swiper}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
        >
            {photos.map((el, index) => (
                <SwiperSlide key={index}>
                    <img src={el} className={css.flatPhoto} onClick={() => toShowImgModal(el)} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};


export default BasicSlider