#set text(fill: color.hsl(0deg, 0, 88%), size: 10pt)
#set page(width: auto, height: auto, margin: 0em)

#let y(x) = text(fill: rgb("#f8ff00"), $#x$)

#align(center)[Permutation composition]

$
  a &= (&&3, &&2, &&5, &&4, &&1) \
  b &= (&&#y(5), &&#y(4), &&#y(1), &&#y(3), &&#y(2)) \
  &&&arrow.b&&arrow.b&&arrow.b&&arrow.b&&arrow.b \
  a dot b
  &= (a(&&#y(5)), a(&&#y(4)), a(&&#y(1)), a(&&#y(3)), a(&&#y(2))) \
  &= (&&1, &&4, &&3, &&5, &&2) \
$
