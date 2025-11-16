#import "../blog_template.typ": *
#show: template

#import "@preview/cetz:0.4.2"
#let offwhite = color.hsl(0deg, 0, 88%)
#let a = $<-$
#let empty(i) = range(i).map(i => [])

#let g(..content) = grid(
  rows: 0.08em * 20,
  columns: 4,
  column-gutter: (0.5em, 0.5em, 0.2em),
  align: (horizon + right, center + horizon, horizon, horizon + left),
  inset: ((:), (x: 1em), (:), (:)),
  stroke: (none, color.hsl(240deg, 7%, 40%), none, none),
  ..content
)

#let lbl(label) = [#sym.zws#metadata(none)#label#sym.zws]

#let c = align(center)[
  #grid(
    rows: 2,
    columns: 2,
    column-gutter: 3em,
    row-gutter: 0.75em,
    align: center,

    [*Stack memory*], [*Heap memory*],
    g(
      [],
      [...],
      a,
      [256],
      [],
      grid.cell(stroke: none, fill: none, [$dots.v$]),
      ..empty(2),
      [length],
      [5],
      a,
      [266],
      [a],
      [2050],
      lbl(<first>),
      ..empty(2),
      [...],
      ..empty(3),
      [...],
      ..empty(3),
      grid.cell(stroke: none, fill: none, [$dots.v$]),
      ..empty(3),
      [...],
      a,
      [2047],
    ),

    g(
      [remaining],
      [0],
      a,
      [2048],
      [next],
      [2055],
      lbl(<third>),
      [],
      lbl(<second>),
      [0],
      ..empty(3),
      [0],
      ..empty(3),
      [0],
      ..empty(3),
      [0],
      ..empty(3),
      [0],
      ..empty(2),
      [remaining],
      [14327],
      lbl(<fourth>),
      [],
      [next],
      [16384],
      ..empty(3),
      grid.cell(stroke: none, fill: none, [$dots.v$]),
      ..empty(3),
      [...],
      a,
      [16383],
    ),
  )
]

#c

#context {
  let m = measure(c)
  let p = locate(<first>).position()
  let p2 = locate(<second>).position()
  let p3 = locate(<third>).position()
  let p4 = locate(<fourth>).position()
  place(dx: 0pt, dy: -m.height)[
    #cetz.canvas(length: 1pt, {
      import cetz.draw: *
      rect((0, 0), (m.width, m.height), stroke: none)
      line(
        (p.x - 4pt, m.height - p.y + 3pt),
        (p2.x, m.height - p2.y + 2pt),
        stroke: (thickness: 0.75pt, paint: offwhite),
        mark: (end: "straight"),
      )
      bezier(
        (p3.x - 4pt, m.height - p3.y + 3pt),
        (p4.x - 4pt, m.height - p4.y + 3pt),
        (p3.x + 15pt, (m.height - p3.y + 6pt + m.height - p4.y) / 2),
        stroke: (thickness: 0.75pt, paint: offwhite),
        mark: (end: "straight"),
      )
    })
  ]
}

// #label-arrow(<first>, <second>, tip: (symbol: ">", fill: white, stroke: white))
// #label-arrow(
//   <third>,
//   <fourth>,
//   tip: (symbol: ">", fill: white, stroke: white),
//   bend: -30,
//   both-offset: (-3.5mm, 0mm),
// )


