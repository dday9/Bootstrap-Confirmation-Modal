# Bootstrap Confirmation Modal

A simple jQuery solution for displaying and handling Bootstrap confirmation modals on the fly.

## Demo
Demo Files: [./demo](./demo)

Fiddle: https://jsfiddle.net/7g4819yL/

## Dependencies
### CSS
 - Bootstrap 4.5.3

### JavaScript
 - jQuery 3.5.1
 - Bootstrap 4.5.3

## Usage
### Simplest Usage
```js
bootstrapConfirmation();
```

### Complex Usage
```js
bootstrapConfirmation({
    yesCallBack: function () {
        console.log('yes');
    },
    noCallBack: function () {
        console.log('no');
    },
    config: {
        closeIcon: true,
        message: 'This is an example.',
        title: 'Example',
        no: {
            class: 'btn btn-danger',
            text: 'No'
        },
        yes: {
            class: 'btn btn-success',
            text: 'Yes'
        }
    }
});
```

## Configuration
The `bootstrapConfirmation` function takes an optional parameter that, when present, should be an object as represented by this picture:

![bootstrapConfirmation screenshot with legend](screenshot.png)

### config
Object with the following properties:
|    Name   |     Type     |                    Default                   |                                      Description                                      |
|-----------|--------------|----------------------------------------------|---------------------------------------------------------------------------------------|
| closeIcon | boolean      | false                                        | Toggles the visibility of the close icon button in the top-right corner of the modal. |
| message   | string       | ''                                           | The text inside the modal-body element.                                               |
| title     | string       | ''                                           | The text inside the modal-title element                                               |
| no        | actionButton | { class: 'confirmation-no', text: 'Cancel' } | Specifies the class and text properties of the 'no' button.                           |
| yes       | actionButton | { class: 'confirmation-yes', text: 'Ok' }    | Specifies the class and text properties of the 'yes' button                           |

#### actionButton
Object with the following properties:
|  Name |  Type  |                  Description                 |
|-------|--------|----------------------------------------------|
| class | string | The class attribute of the respective button |
| text  | string | The text of the respective button            |

### yesCallBack
Function that gets executed when the user clicks on the 'yes' button.

### noCallBack
Function that gets executed when the user clicks on the 'no' button.

## Donate
Show your support! Your (non-tax deductible) donation of Monero cryptocurrency is a sign of solidarity among web developers.

Being self taught, I have come a long way over the years. I certainly do not intend on making a living from this free feature, but my hope is to earn a few dollars to validate all of my hard work.

Monero Address: 447SPi8XcexZnF7kYGDboKB6mghWQzRfyScCgDP2r4f2JJTfLGeVcFpKEBT9jazYuW2YG4qn51oLwXpQJ3oEXkeXUsd6TCF

![447SPi8XcexZnF7kYGDboKB6mghWQzRfyScCgDP2r4f2JJTfLGeVcFpKEBT9jazYuW2YG4qn51oLwXpQJ3oEXkeXUsd6TCF](donate.png)
