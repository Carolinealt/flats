import basicSliderMin from "basicslider"

const opt = {
    index: 0,
    arrows: true,
    dots: true,
}

export default function getSlider(id) {
    const instance = basicSliderMin.create(document.querySelector(`${id}`), [
        '<p>Slide 1 with HTML</p>',
        '<p>Slide 2 with HTML</p>',
        '<p>Slide 3 with HTML</p>'
    ], opt)

    return instance
}