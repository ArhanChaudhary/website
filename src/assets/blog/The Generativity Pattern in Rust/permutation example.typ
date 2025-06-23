#set text(fill: color.hsl(0deg, 0, 88%), size: 10pt)
#set page(width: auto, height: auto, margin: 0em)

#let r(x) = text(fill: green, $#x$)

#align(center)[Permutation composition]

$
  a &= (&&3, &&2, &&5, &&4, &&1) \
  b &= (&&#r(5), &&#r(4), &&#r(1), &&#r(3), &&#r(2)) \
  &&&arrow.b&&arrow.b&&arrow.b&&arrow.b&&arrow.b \
  a dot b
  &= (a(&&#r(5)), a(&&#r(4)), a(&&#r(1)), a(&&#r(3)), a(&&#r(2))) \
  &= (&&1, &&2, &&4, &&3, &&5) \
$
