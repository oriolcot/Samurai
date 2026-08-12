# Editar personatges i diàlegs

Obre `data/characters.js`. Cada bloc correspon a un personatge.

## Per canviar el text

Edita només el text entre cometes dins de `copy`:

- `encounter`: abans d'endevinar qui és.
- `revealed`: després d'encertar el nom, al costat de la foto.
- `recruit`: quan apareix l'opció de reclutar-lo.

Les tres respostes que veu el jugador són els textos `label` dins de `dialogues`.

## Per canviar el nom acceptat

Modifica `answers`. Pots afegir variants, separades per comes, per exemple:

```js
answers: ['ferran', 'fer', 'fernan']
```

## Què no cal tocar

Els camps `id`, `effect`, `passive` i `active` són la part de mecàniques. Pots deixar-los com estan mentre escrius el guió.
