#set text(fill: color.hsl(0deg, 0, 88%), size: 10pt)
#set page(width: auto, height: auto, margin: 0em)

#let y(x) = text(fill: rgb("#f8ff00"), $#x$)

#align(center)[Permutation composition]

$
        a & = (   && 2,         && 1,         && 4,         && 3,         && 0)      \
        b & = (   && #y(4),     && #y(3),     && #y(0),     && #y(2),     && #y(1))  \
          &       && arrow.b    && arrow.b    && arrow.b    && arrow.b    && arrow.b \
  a dot b & = (a( && #y(4)), a( && #y(3)), a( && #y(0)), a( && #y(2)), a( && #y(1))) \
          & = (   && 0,         && 3,         && 2,         && 4,         && 1)      \
$
