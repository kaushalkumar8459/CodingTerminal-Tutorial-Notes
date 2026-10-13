import sanitizeHtml from "sanitize-html";

// Unsupported markup is escaped so source content stays visible without executing.
const options: sanitizeHtml.IOptions = {
  allowedTags: [
    "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "div", "span",
    "strong", "b", "em", "i", "u", "s", "small", "mark", "abbr", "cite", "q", "time", "sub", "sup", "kbd", "samp", "var", "del", "ins",
    "code", "pre", "blockquote", "ul", "ol", "li", "dl", "dt", "dd", "a",
    "figure", "figcaption", "img", "picture", "source", "map", "area", "canvas",
    "svg", "g", "path", "circle", "ellipse", "rect", "line", "polyline", "polygon", "title", "desc", "defs", "use", "text",
    "details", "summary", "audio", "video", "track",
    "table", "thead", "tbody", "tr", "th", "td", "colgroup", "col",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height", "loading", "decoding", "usemap"],
    canvas: ["width", "height"],
    svg: ["viewBox", "width", "height", "role", "aria-labelledby", "focusable"],
    path: ["d", "fill", "stroke", "stroke-width", "transform"],
    circle: ["cx", "cy", "r", "fill", "stroke", "stroke-width"],
    ellipse: ["cx", "cy", "rx", "ry", "fill", "stroke", "stroke-width"],
    rect: ["x", "y", "width", "height", "rx", "ry", "fill", "stroke", "stroke-width"],
    line: ["x1", "y1", "x2", "y2", "stroke", "stroke-width"],
    polyline: ["points", "fill", "stroke", "stroke-width"],
    polygon: ["points", "fill", "stroke", "stroke-width"],
    use: ["href", "x", "y", "width", "height"],
    text: ["x", "y", "dx", "dy", "fill", "font-size", "text-anchor"],
    source: ["src", "srcset", "type", "media", "sizes"],
    picture: [],
    map: ["name"],
    area: ["alt", "coords", "shape", "href", "target"],
    details: ["open"],
    audio: ["src", "controls", "preload", "loop", "muted"],
    video: ["src", "poster", "width", "height", "controls", "preload", "loop", "muted"],
    track: ["src", "kind", "srclang", "label", "default"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    col: ["style"],
    "*": ["id", "class", "title", "lang", "dir", "role", "aria-label", "aria-labelledby", "aria-describedby"],
    code: ["class"],
    pre: ["class"],
  },
  allowedClasses: {
    "*": [/^[a-zA-Z0-9_-]+$/],
    code: [/^language-[a-z0-9+#.-]+$/],
    pre: [],
  },
  disallowedTagsMode: "escape",
  nonTextTags: [],
  allowedStyles: { col: { width: [/^\d+(\.\d+)?(px|%)$/] } },
  allowedSchemes: ["http", "https", "mailto"],
  allowProtocolRelative: false,
  transformTags: {
    // The page title is the only h1; body headings start at h2.
    h1: "h2",
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
  },
};

export function sanitizeLessonHtml(dirty: string) {
  return sanitizeHtml(dirty, options).trim();
}
