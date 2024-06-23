!(function (e) {
  var t = {};
  function n(s) {
    if (t[s]) return t[s].exports;
    var o = (t[s] = { i: s, l: !1, exports: {} });
    e[s].call(o.exports, o, o.exports, n);
    o.l = !0;
    return o.exports;
  }
  n.m = e;
  n.c = t;
  n.d = function (e, t, s) {
    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
  };
  n.r = function (e) {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
    Object.defineProperty(e, "__esModule", { value: !0 });
  };
  n.t = function (e, t) {
    1 & t && (e = n(e));
    if (8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var s = Object.create(null);
    n.r(s);
    Object.defineProperty(s, "default", { enumerable: !0, value: e });
    if (2 & t && "string" != typeof e)
      for (var o in e)
        n.d(
          s,
          o,
          function (t) {
            return e[t];
          }.bind(null, o)
        );
    return s;
  };
  n.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    n.d(t, "a", t);
    return t;
  };
  n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  };
  n.p = "//static.hsappstatic.net/HubspotToolsMenu/static-1.321/";
  n((n.s = 3));
})([
  function (e, t) {
    e.exports =
      "//static.hsappstatic.net/HubspotToolsMenu/static-1.321/js/sprocket_white.svg";
  },
  function (e, t) {
    e.exports =
      "//static.hsappstatic.net/HubspotToolsMenu/static-1.321/js/sprocket_orange.svg";
  },
  function (e, t) {
    e.exports =
      "//static.hsappstatic.net/HubspotToolsMenu/static-1.321/css/toolsmenu.css";
  },
  function (e, t, n) {
    "use strict";
    n.r(t);
    const s = "HS_SPROCKET_MENU_LOCAL_OVERRIDE",
      o = "https://local.hsappstatic.net/HubspotToolsMenu/static/js/index.js",
      r = () =>
        Array.from(document.body.getElementsByTagName("script")).some(
          (e) => e.src === o
        ),
      i = () => !(!window.localStorage.getItem(s) && 1) && !r(),
      l = () => {
        const e = document.createElement("script");
        e.src = o;
        e.onload = () => {
          setTimeout(() => {
            const e = new Event("DOMContentLoaded");
            document.dispatchEvent(e);
          }, 100);
        };
        document.body.appendChild(e);
      };
    i() && l();
    var a = n(0),
      c = n.n(a),
      d = n(1),
      h = n.n(d),
      p = n(2),
      u = n.n(p);
    const m = {
      SUCCESS: "hs-local-dev-server--success",
      WARNING: "hs-local-dev-server--warning",
      FAILURE: "hs-local-dev-server--failed",
    };
    class v {
      constructor(e) {
        this.baseUrl = this.getHsBaseUrl(e.app_hs_base_url);
        this.cpBaseUrl = this.getHsBaseUrl(e.cp_hs_base_url);
        this.contentId =
          e.dynamic_page_id &&
          "0" !== e.dynamic_page_id &&
          "null" !== e.dynamic_page_id
            ? e.dynamic_page_id
            : e.page_id;
        this.categoryId = e.category_id;
        this.contentGroupId = e.content_group_id;
        this.portalId = e.portal_id;
        this.environments = { PRODUCTION: 1, STAGING: 2 };
        this.isCustomerPortal = !0 === e.is_customer_portal;
        this.cmsEnvironment = this.getCmsEnvironmentFromCookie();
        this.contentUrl = this.getHsContentUrl();
        this.permissionObj = {};
      }
      getHsBaseUrl(e) {
        return window.localStorage.getItem("HS_LOCAL_TESTING")
          ? e.replace(/[^/](\w+?)(?=\.)/, "local")
          : e;
      }
      getHsContentUrl() {
        const e = window.location.href.split("?")[0],
          t = new URLSearchParams(window.location.search);
        return t.has("hs_preview")
          ? `${e}?hs_preview=${t.get("hs_preview")}`
          : e;
      }
      createElementFromHTML(e) {
        const t = document.createElement("div");
        t.innerHTML = e.trim();
        return t.firstChild;
      }
      jsonp(e, t) {
        window.jsonpHandler = (e) => {
          t(e);
        };
        const n = `${e}${
            -1 !== e.indexOf("?") ? "&" : "?"
          }callback=jsonpHandler`,
          s = document.createElement("script");
        s.type = "text/javascript";
        s.referrerPolicy = "no-referrer-when-downgrade";
        s.async = !0;
        s.src = n;
        document.getElementsByTagName("head")[0].appendChild(s);
      }
      httpGet(e, t) {
        const n = new XMLHttpRequest();
        n.withCredentials = !0;
        n.onreadystatechange = function () {
          4 === this.readyState &&
            200 === this.status &&
            t(JSON.parse(this.responseText));
        };
        n.open("GET", e, !0);
        n.send();
      }
      showToolsMenuIfAuthor() {
        let e,
          t = this.contentId;
        const n = this.contentUrl;
        let s = !1;
        if (this.isCustomerPortal) e = "customer-portal";
        else if (window.location.pathname.endsWith("_hcms/mem/login"))
          e = "content-membership";
        else if (this.contentId && this.contentGroupId)
          e =
            7 === this.categoryId
              ? "blog-listing-pages"
              : 6 === this.categoryId || 12 === this.categoryId
              ? "knowledge-articles"
              : "blog-posts";
        else if (this.contentGroupId) {
          e = 6 === this.categoryId ? "knowledge-bases" : "blogs";
          t = this.contentGroupId;
        } else {
          s = !0;
          e = "landing-pages";
        }
        const o = `${this.baseUrl}/content-tools-menu/api/v1/tools-menu/has-permission-json?portalId=${this.portalId}`;
        this.httpGet(o, (o) => {
          if (o.has_permission) {
            const o = `${this.cpBaseUrl}/content-tools-menu/api/v1/tools-menu/permissions?portalId=${this.portalId}`;
            this.httpGet(o, (o) => {
              this.permissionObj = o;
              "content-membership" === e
                ? this.getContentMembershipCookie(e, this.portalId)
                : this.getAppLinks(e, t, this.portalId, n);
              s && this.setupDeferredPrefetchingOfEditorAssets(e);
            });
          }
        });
      }
      getContentMembershipCookie(e, t) {
        this.jsonp(
          `${this.baseUrl}/content-tools-menu/api/v1/content/validate-hubspot-user?redirect_url=${window.location.href}&portalId=${t}`,
          (e) => {
            if (e && e.verified) {
              const t = this.getUrlParameter("redirect_url");
              window.location.href =
                t || e.redirectUrl || window.location.origin;
            }
          }
        );
      }
      getAppLinks(e, t, n, s) {
        this.httpGet(
          `${this.baseUrl}/content-tools-menu/api/v1/tools-menu/${e}/${t}/actions-json?portalId=${n}&clientUrl=${s}`,
          (e) => {
            e.actions && e.strings && this.showAppLinks(e.actions, e.strings);
          }
        );
      }
      renderAction(e) {
        const t = e[2] ? `class='${e[2]}'` : "";
        return `<li><a target='_blank' ${e[1] ? `href='${e[1]}'` : ""} ${t}>\n${
          e[0]
        }\n</a></li>`;
      }
      showAppLinks(e, t) {
        const n = [].slice
            .call(document.querySelectorAll("[data-menu-id]"))
            .filter((e) => !!e.getAttribute("data-menu-id").trim()),
          s = n.length > 0 ? n[0] : null;
        if (null !== s) {
          const n = s.getAttribute("data-menu-id").trim();
          e.push([
            t.EDIT_NAVIGATION_MENU,
            `${this.baseUrl}/menus/${this.portalId}/edit/${n}`,
          ]);
        }
        e.push(["Open Local Dev Server", "", "hs-local-dev-server"]);
        let o = e.map(this.renderAction).join("");
        if (
          this.permissionObj.permissions.includes("CAN_PREVIEW_ENVIRONMENTS")
        ) {
          o += `        <li><a class="hs-environment-buffer-on">${t.VIEW_BUFFER}</a></li>        <li><a class="hs-environment-buffer-off">${t.VIEW_HARD}</a></li>      `;
          o += `        <li><a class="hs-environment-staging">${t.VIEW_STAGING}</a></li>        <li><a class="hs-environment-production">${t.VIEW_PRODUCTION}</a></li>      `;
        }
        const r = `<link rel="stylesheet" href="${u.a}" />`,
          i = `\n      <div role="button" class="hs-tools-menu hs-collapsed" aria-expanded="false">\n        <img class="hs-sprocket" alt="${t.MENU_ICON_ALT_TEXT}" src="${c.a}" />\n        <div class="hs-dropdown">\n          <div class="hs-title">${t.MENU_TITLE}</div>\n          <ul class="hs-tools-actions">\n            ${o}\n            <li>\n              <a role="button" href="#hide-menu" class="hs-menu-hider">${t.HIDE_THIS_MENU}</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    `;
        document.body.appendChild(this.createElementFromHTML(r));
        document.body.appendChild(this.createElementFromHTML(i));
        this.registerEvents();
      }
      registerEvents() {
        const e = document.querySelector(".hs-tools-menu");
        this.registerDropdown(e);
        e.querySelector(".hs-menu-hider").addEventListener("click", (t) => {
          t.preventDefault();
          t.stopPropagation();
          e.style.display = "none";
        });
        const t = e.querySelector(".hs-environment-buffer-on");
        t &&
          (this.cmsEnvironment.buffer
            ? t.parentElement.removeChild(t)
            : t.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.requestAndSetEnvironmentCookie(
                  this.portalId,
                  !0,
                  this.cmsEnvironment.environmentId
                );
              }));
        const n = e.querySelector(".hs-environment-buffer-off");
        n &&
          (this.cmsEnvironment.buffer
            ? n.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.requestAndSetEnvironmentCookie(
                  this.portalId,
                  !1,
                  this.cmsEnvironment.environmentId
                );
              })
            : n.parentElement.removeChild(n));
        const s = e.querySelector(".hs-environment-staging");
        s &&
          (this.cmsEnvironment.environmentId !== this.environments.STAGING
            ? s.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.requestAndSetEnvironmentCookie(
                  this.portalId,
                  this.cmsEnvironment.buffer,
                  this.environments.STAGING
                );
              })
            : s.parentElement.removeChild(s));
        const o = e.querySelector(".hs-environment-production");
        o &&
          (this.cmsEnvironment.environmentId !== this.environments.PRODUCTION
            ? o.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.requestAndSetEnvironmentCookie(
                  this.portalId,
                  this.cmsEnvironment.buffer,
                  this.environments.PRODUCTION
                );
              })
            : o.parentElement.removeChild(o));
      }
      requestAndSetEnvironmentCookie(e, t, n) {
        const s = `${this.cpBaseUrl}/content-tools-menu/api/v1/tools-menu/environment-cookie?portalId=${e}&environmentId=${n}&buffer=${t}`;
        this.httpGet(s, (e) => {
          document.cookie = "hs_cms_environment=" + btoa(JSON.stringify(e));
          window.location.reload();
        });
      }
      registerDropdown(e) {
        const t = Array.from(e.children).find((e) =>
            e.classList.contains("hs-sprocket")
          ),
          n = () => {
            e.classList.add("hs-collapsed");
            e.setAttribute("aria-expanded", !1);
            t.setAttribute("src", c.a);
          },
          s = () => {
            e.classList.remove("hs-collapsed");
            e.setAttribute("aria-expanded", !0);
            t.setAttribute("src", h.a);
            e.querySelector(".hs-dropdown").style.display = "";
          },
          o = () => {
            n();
            document.body.removeEventListener("click", o);
          },
          r = (t) => {
            if (
              null === t.target.getAttribute("href") ||
              t.target.classList.contains("hs-local-dev-server")
            ) {
              t.preventDefault();
              t.stopPropagation();
              if (t.target.classList.contains("hs-local-dev-server"))
                this.setUpLocalDevUrl();
              else if (e.classList.contains("hs-collapsed")) {
                s();
                document.body.addEventListener("click", o);
              } else {
                n();
                document.body.removeEventListener("click", o);
              }
            }
          };
        e.addEventListener("click", r, !1);
      }
      getUrlParameter(e) {
        e = e.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
        const t = new RegExp(`[\\?&]${e}=([^&#]*)`).exec(location.search);
        return null === t ? "" : decodeURIComponent(t[1].replace(/\+/g, " "));
      }
      getCmsEnvironmentFromCookie() {
        const e = this.getCookie("hs_cms_environment");
        return e
          ? JSON.parse(atob(e))
          : {
              portalId: 0,
              environmentId: this.environments.PRODUCTION,
              buffer: !1,
              createdAt: 0,
            };
      }
      getCookie(e) {
        const t = e + "=",
          n = document.cookie.split(";");
        for (let e = 0; e < n.length; e++) {
          let s = n[e];
          for (; " " === s.charAt(0); ) s = s.substring(1);
          if (0 === s.indexOf(t)) return s.substring(t.length, s.length);
        }
        return "";
      }
      setupDeferredPrefetchingOfEditorAssets(e) {
        window.addEventListener("load", () => {
          setTimeout(() => {
            let t;
            if ("landing-pages" !== e) return;
            t = "content/editor/prefetcher.js";
            const n = document.createElement("script");
            n.src = `${this.baseUrl}/${t}`;
            document.head.appendChild(n);
          }, 2e3);
        });
      }
      setUpLocalDevUrl() {
        let e = window.location.hostname,
          t = window.location.pathname;
        const n = window.location.search,
          s = document.querySelector(
            ".hs-tools-menu .hs-tools-actions .hs-local-dev-server"
          );
        n &&
          n
            .slice("1")
            .split("&")
            .forEach((n) => {
              if (n.indexOf("hsDebugOverridePublicHost") > -1) {
                e = n.split("=")[1];
                t = t.replace("/cos-rendering/v1/public", "");
              }
            });
        const o = {
            hostName: e,
            pathName: t,
            protocol: window.location.protocol,
            contentId: this.contentId,
            portalId: this.portalId,
          },
          r = Object.keys(o)
            .map((e) => `${e}=${o[e]}`)
            .join("&"),
          i = this.resetLocalDevLink.bind(this),
          l = this.setLocalDevServerSuccess.bind(this),
          a = this.setLocalDevServerFailure.bind(this);
        i(s);
        fetch("http://localhost:1442/check-if-local-dev-server?" + r)
          .then((e) => {
            if (!e.ok) throw e.statusText;
            return e.json();
          })
          .then((e) => l(e, s))
          .catch((e) => {
            console.error(e);
            a(s);
          });
      }
      resetLocalDevLink(e) {
        e.classList.remove(m.SUCCESS, m.WARNING, m.FAILURE);
        e.removeAttribute("href", "title");
      }
      setLocalDevServerSuccess(e, t) {
        if (e.localProxyUrl) {
          t.setAttribute("href", e.localProxyUrl);
          t.classList.add(m.SUCCESS);
          window.open(e.localProxyUrl, "_blank");
        } else {
          t.classList.add(m.WARNING);
          t.setAttribute("title", "Proxy unavailable - Click to retry");
        }
      }
      setLocalDevServerFailure(e) {
        e.classList.add(m.FAILURE);
        e.setAttribute("title", "Local server not running - Click to retry");
      }
    }
    class f {
      constructor() {
        this.getShowAllFiltersLinkEventHandler = (e) => (t) => {
          const {
            previousElementSibling: { children: n },
          } = e;
          n &&
            [].slice.call(n, 0).forEach((e) => {
              e.style.display = "block";
            });
          e.style.display = "none";
          t.preventDefault();
          t.stopPropagation();
        };
      }
      setup() {
        [].slice
          .call(document.querySelectorAll(".filter-expand-link"), 0)
          .forEach((e) => {
            e.addEventListener(
              "click",
              this.getShowAllFiltersLinkEventHandler(e)
            );
          });
      }
    }
    const g = () => {
      const e = window.location,
        { port: t, hostname: n, pathname: s } = e,
        o = e !== window.parent.location,
        r = s.includes("_hcms/preview/template"),
        l = "" !== t || n.includes("hslocal.net") || n.includes("localhost");
      return !(o || r || i() || l);
    };
    !(function () {
      if (window.document.documentMode) return;
      const e = () => {
        if (!window.hsVars || !window.hsVars.portal_id) return;
        new v(window.hsVars).showToolsMenuIfAuthor();
        new f().setup();
      };
      g() &&
        ("loading" === document.readyState
          ? document.addEventListener(
              "DOMContentLoaded",
              function t() {
                e();
                document.removeEventListener("DOMContentLoaded", t);
              },
              !1
            )
          : e());
    })();
  },
]);
//# sourceMappingURL=//static.hsappstatic.net/HubspotToolsMenu/static-1.321/js/index.js.map
