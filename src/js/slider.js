let multiItemSliderIndex = (function () {
    return function (selector, config) {
        let
            _mainElementIndex = document.querySelector(selector), // основный элемент блока
            _sliderWrapperIndex = _mainElementIndex.querySelector('.slider__block'), // обертка для .slider-item
            _sliderItemsIndex = _mainElementIndex.querySelectorAll('.slider__image-item'), // элементы (.slider-item)
            _sliderControlsIndex = _mainElementIndex.querySelectorAll('.slider__arrow-control'), // элементы управления
            _sliderControlLeftIndex = _mainElementIndex.querySelector('.slider__arrow-control_left'), // кнопка "LEFT"
            _sliderControlRightIndex = _mainElementIndex.querySelector('.slider__arrow-control_right'), // кнопка "RIGHT"
            _wrapperWidthIndex = parseFloat(getComputedStyle(_sliderWrapperIndex).width), // ширина обёртки
            _itemWidthIndex = parseFloat(getComputedStyle(_sliderItemsIndex[0]).width), // ширина одного элемента
            _positionLeftItemIndex = 0, // позиция левого активного элемента
            _transformIndex = 0, // значение транфсофрмации .slider_wrapper
            _stepIndex = _itemWidthIndex / _wrapperWidthIndex * 100, // величина шага (для трансформации)
            _itemsIndex = []; // массив элементов


        // наполнение массива _items
        _sliderItemsIndex.forEach(function (item, index) {
            _itemsIndex.push({item: item, position: index, transform: 0});
        });

        let position = {
            getItemMin: function () {
                let indexItem = 0;
                _itemsIndex.forEach(function (item, index) {
                    if (item.position < _itemsIndex[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getItemMax: function () {
                let indexItem = 0;
                _itemsIndex.forEach(function (item, index) {
                    if (item.position > _itemsIndex[indexItem].position) {
                        indexItem = index;
                    }
                });
                return indexItem;
            },
            getMin: function () {
                return _itemsIndex[position.getItemMin()].position;
            },
            getMax: function () {
                return _itemsIndex[position.getItemMax()].position;
            }
        };

        let _transformItem = function (direction) {
            let nextItem;
            if (direction === 'right') {
                _positionLeftItemIndex++;
                if ((_positionLeftItemIndex + _wrapperWidthIndex / _itemWidthIndex - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _itemsIndex[nextItem].position = position.getMax() + 1;
                    _itemsIndex[nextItem].transform += _itemsIndex.length * 100;
                    _itemsIndex[nextItem].item.style.transform = 'translateX(' + _itemsIndex[nextItem].transform + '%)';
                }
                _transformIndex -= _stepIndex;
            }
            if (direction === 'left') {
                _positionLeftItemIndex--;
                if (_positionLeftItemIndex < position.getMin()) {
                    nextItem = position.getItemMax();
                    _itemsIndex[nextItem].position = position.getMin() - 1;
                    _itemsIndex[nextItem].transform -= _itemsIndex.length * 100;
                    _itemsIndex[nextItem].item.style.transform = 'translateX(' + _itemsIndex[nextItem].transform + '%)';
                }
                _transformIndex += _stepIndex;
            }
            _sliderWrapperIndex.style.transform = 'translateX(' + _transformIndex + '%)';
        };

        // обработчик события click для кнопок "назад" и "вперед"
        let _controlClick = function (e) {
            e.preventDefault();
            let direction = this.classList.contains('slider__arrow-control_right') ? 'right' : 'left';
            _transformItem(direction);
        };

        let _setUpListeners = function () {
            // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
            _sliderControlsIndex.forEach(function (item) {
                item.addEventListener('click', _controlClick);
            });
        };

        // инициализация
        _setUpListeners();

        return {
            right: function () { // метод right
                _transformItem('right');
            },
            left: function () { // метод left
                _transformItem('left');
            }
        }

    }
}());
let sliderIndex = multiItemSliderIndex('.slider-container');
