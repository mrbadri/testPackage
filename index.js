module.exports.test = (input) => input * 2;
module.exports.Navimation = Navimation;

function NV_Fn() {
  function style(element, css) {
    Object.assign(element.style, css);
  }

  function animationCnotroller({ navbar, items, animation, NV_Element }) {
    if (animation.type === "A" || animation.type === "a") {
      NV_Element = {
        ...NV_Element,
        style: {
          ...NV_Element.style,
          position: "absolute",
          bottom: "0",
          width: "0",
          transform: "scale(0)",
          height: "2px",
          background: "red",
          ...animation.style,
        },
      };
    }
  }

  function animation({ navbar, items, animation }) {
    let NV_Element = {
      element: document.createElement("div"),
      style: {
        background: "red",
        height: "1",
        transition: ` left 0.5s  , transform 0.5s`,
        transform: "scaleX(0)",
        position: "absolute",
        left: "0",
      },
    };

    animationCnotroller({ navbar, items, animation, NV_Element });

    items.forEach((item) => {
      item.addEventListener(animation.event, function (e) {
        let newStyle = {
          left:
            this.getBoundingClientRect().left -
            navbar.getBoundingClientRect().left,
          width: this.offsetWidth,
          transform: "scaleX(1)",
          bottom: "0",
        };
        style(NV_Element.element, { ...NV_Element.style, ...newStyle });
      });
    });

    if (animation.event === "mouseenter") {
      navbar.addEventListener("mouseleave", function () {
        style(NV_Element.element, { transform: "scaleX(0)" });
      });
    }

    NV_Element.element.setAttribute("id", "navimation");
    navbar.appendChild(NV_Element.element);

    style(NV_Element.element, NV_Element.style);
    style(navbar, { position: "relative" });
  }

  return { animation, style };
}

function Navimation(config) {
  let navbar = config.navbar ? config.navbar : document.querySelector("ul"),
    items = config.items ? config.items : navbar.querySelectorAll("li"),
    animation = config.animation,
    type = config.type;

  NV_Fn().animation({ navbar, items, animation });
}
