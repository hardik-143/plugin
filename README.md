
# TextEffect

A simple plugin to add effects into normal text

## Available Effects

- Wave
- Outline
- Split
- Glitch
- gif


## 1. Wave

| Property | type  | default |
|:-----|:--------:|------:|
| wrapperElement   | string | div |
| textElement   | string | h3 |
| color   | `rgb` & `hex` | #1B9C85 |
| fontSize   | `px` | 40px |

#### **Html**
```
<span id="waveText">Wave</span>
```
#### **Javascript**
```
$('#waveText').texteffect({
    effect: 'wave',
    color: '#E57C23',
    fontSize: '60px',
    textElement: 'h1',
    wrapperElement: 'div',
})
```

## 2. Outline

| Property | type  | default |
|:-----|:--------:|------:|
| wrapperElement   | string | div |
| textElement   | string | h3 |
| hoverEffect   | boolean | false |
| fontSize   | `px` | 50px |

#### **Html**
```
<span id="outlineText">Github</span>
```
#### **Javascript**
```
$('#outlineText').texteffect({
    effect: 'outline',
    wrapperElement: 'div',
    hoverEffect: true,
})
```

## 3. Split

| Property | type  | default |
|:-----|:--------:|------:|
| wrapperElement   | string | div |
| textElement   | string | p |
| color   | `rgb` & `hex` | #1B9C85 |
| fontSize   | `px` | 50px |

#### **Html**
```
<span class="splitText">Split</span>
```
#### **Javascript**
```
$('.splitText').texteffect({
    effect: 'split',
    wrapperElement: 'div',
    fontSize: '100px'
})
```

## 4. Glitch

| Property | type  | default |
|:-----|:--------:|------:|
| wrapperElement   | string | div |
| textElement   | string | p |
| fontSize   | `px` | 50px |

#### **Html**
```
<span id="glitchText">Glitch</span>
```
#### **Javascript**
```
$('#glitchText').texteffect({
    effect: 'glitch',
    wrapperElement: 'div',
    fontSize: '60px',
    textElement: 'h1',
})
```


## 5. Gif

| Property | type  | default |
|:-----|:--------:|------:|
| wrapperElement   | string | div |
| textElement   | string | p |
| fontSize   | `px` | 50px |
| gif   | string | water |

##### **Available GIFs** : `water`  `rain`  `fire` `rain` `space` `cloud` `money`

#### **Html**
```
<span id="gifText">Hello</span>
```
#### **Javascript**
```
$('#gifText').texteffect({
    effect: 'gif',
    gif: 'rain',
    wrapperElement: 'div',
    fontSize: '60px',
    textElement: 'h1',
})
```
