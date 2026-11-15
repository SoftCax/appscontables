/* =======================================================================
   Apps Contables · Scripts del sitio
   Configura aquí tu WhatsApp, tu correo y el enlace de descarga.
   Se aplican en todas las páginas.
   ======================================================================= */

const CONFIG = {
  // Número de WhatsApp con código de país, sin espacios ni signos.
  // Ejemplo Perú: 51934101490
  whatsapp: "51977109374",
  correo: "appscontablesperu@gmail.com",
  // Enlace directo al instalador de Buzón SOL.
  // Cámbialo cuando publiques el instalador en tu propio dominio.
  descarga: "https://raw.githubusercontent.com/SoftCax/PublishApps/main/BuzonSOL/BuzonSOL.exe",
  // URL del Web App de Google Apps Script que guarda las solicitudes en tu hoja.
  // Mientras esté vacía, el formulario abre el Google Form con los datos ya cargados.
  formulario: "https://script.google.com/macros/s/AKfycbwA1D67CouEq3VnISJy4Upx6o3C_6JFA4AEcjlxzEcSWm2EsjNSPrfXj_FKcljNj52hAg/exec",
  // Campos del Google Form, para abrirlo rellenado si no hay Apps Script.
  formGoogle: "https://docs.google.com/forms/d/e/1FAIpQLSe6lrPUCJOmq6paTJl__E_Mx05GDbWR8gKUkkGlb06F-YiaTA/viewform",
  formCampos: {
    dni: "entry.712873267",
    nombre: "entry.1052954850",
    situacion: "entry.1332151483",
    codigo: "entry.2016846477",
    alias: "entry.1430918371",
    celular: "entry.351963204",
    correo: "entry.200787772",
  },
};

/* ------------------------------------------------------------- Utilidades */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function enlaceWhatsApp(mensaje) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

/* ------------------------------------------------------------- Tema claro/oscuro */

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  try { localStorage.setItem("cp_tema", tema); } catch (e) { /* modo privado */ }
  const boton = $(".btn-tema");
  if (boton) {
    boton.setAttribute("aria-label", tema === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }
}

function iniciarTema() {
  const boton = $(".btn-tema");
  const actual = document.documentElement.getAttribute("data-theme") || "light";
  if (boton) {
    boton.setAttribute("aria-label", actual === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
    boton.addEventListener("click", () => {
      const nuevo = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      aplicarTema(nuevo);
    });
  }
}

/* ------------------------------------------------------------- Menú móvil */

function iniciarMenu() {
  const boton = $(".btn-menu");
  const nav = $(".nav");
  if (!boton || !nav) return;

  boton.addEventListener("click", () => {
    const abierto = nav.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", String(abierto));
  });

  $$(".nav a").forEach((a) => a.addEventListener("click", () => {
    nav.classList.remove("abierto");
    boton.setAttribute("aria-expanded", "false");
  }));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      nav.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
    }
  });
}

/* ------------------------------------------------------------- Enlaces dinámicos */

function iniciarWhatsApp() {
  const generico = "Hola, quiero información sobre Buzón SOL.";

  $$("[data-wa]").forEach((el) => {
    const mensaje = el.getAttribute("data-wa") || generico;
    el.setAttribute("href", enlaceWhatsApp(mensaje));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  $$("[data-correo]").forEach((el) => {
    const asunto = el.getAttribute("data-correo") || "Consulta";
    el.setAttribute("href", `mailto:${CONFIG.correo}?subject=${encodeURIComponent(asunto)}`);
  });

  $$("[data-descarga]").forEach((el) => {
    el.setAttribute("href", CONFIG.descarga);
    el.setAttribute("rel", "noopener");
  });

  $$("[data-correo-texto]").forEach((el) => {
    el.textContent = CONFIG.correo;
  });
}

/* ------------------------------------------------------------- Licencia de prueba */

function enlaceGoogleFormulario(datos) {
  const params = new URLSearchParams();
  params.set("usp", "pp_url");
  Object.entries(CONFIG.formCampos).forEach(([campo, entrada]) => {
    const valor = String(datos[campo] || "").trim();
    if (valor) params.set(entrada, valor);
  });
  return `${CONFIG.formGoogle}?${params.toString()}`;
}

function iniciarLicencia() {
  const form = $("#form-licencia");
  if (!form) return;

  const aviso = $("#aviso-licencia");
  const boton = $("#btn-licencia");
  const exito = $("#exito-licencia");

  const mostrarAviso = (texto, esError) => {
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.classList.add("visible");
    aviso.classList.toggle("aviso-form--error", Boolean(esError));
  };

  const limpiarAviso = () => {
    if (!aviso) return;
    aviso.textContent = "";
    aviso.classList.remove("visible", "aviso-form--error");
  };

  const leerDatos = () => {
    const fd = new FormData(form);
    const datos = Object.fromEntries(fd.entries());
    datos.situacion = (form.querySelector('input[name="situacion"]:checked') || {}).value || "";
    datos.pagina = location.href;
    datos.fecha = new Date().toISOString();
    return datos;
  };

  const abrirGoogle = (datos) => {
    window.open(enlaceGoogleFormulario(datos), "_blank", "noopener");
    mostrarAviso(
      "Abrimos el formulario de Google con tus datos. Pulsa Enviar ahí para terminar la solicitud.",
      false
    );
  };

  const enviar = async (datos) => {
    const respuesta = await fetch(CONFIG.formulario, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(datos),
    });
    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);
    const json = await respuesta.json();
    if (!json || json.ok !== true) throw new Error((json && json.error) || "Error del servidor");
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const datos = leerDatos();
    limpiarAviso();

    // Sin Apps Script configurado: seguimos con el Google Form ya rellenado.
    if (!CONFIG.formulario) {
      abrirGoogle(datos);
      return;
    }

    if (boton) {
      boton.disabled = true;
      boton.dataset.texto = boton.textContent;
      boton.textContent = "Enviando…";
    }

    try {
      await enviar(datos);
      form.hidden = true;
      if (exito) {
        exito.hidden = false;
        exito.focus();
        exito.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } catch (err) {
      mostrarAviso(
        "No pudimos enviar la solicitud. Revisa tu conexión o abre el formulario de Google; tus datos ya están cargados.",
        true
      );
      abrirGoogle(datos);
    } finally {
      if (boton) {
        boton.disabled = false;
        boton.textContent = boton.dataset.texto || "Pedir mi licencia de prueba";
      }
    }
  });
}

/* ------------------------------------------------------------- Formulario */

function iniciarFormulario() {
  const form = $("#form-contacto");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = new FormData(form);
    const nombre = String(datos.get("nombre") || "").trim();
    const empresa = String(datos.get("empresa") || "").trim();
    const contacto = String(datos.get("contacto") || "").trim();
    const aplicacion = String(datos.get("aplicacion") || "").trim();
    const mensaje = String(datos.get("mensaje") || "").trim();

    const texto = [
      `Hola, soy ${nombre}${empresa ? ` de ${empresa}` : ""}.`,
      aplicacion ? `Me interesa: ${aplicacion}.` : "",
      `Mi contacto: ${contacto}.`,
      mensaje ? `Detalle: ${mensaje}` : "",
    ].filter(Boolean).join("\n");

    const aviso = $("#aviso-form");
    if (aviso) {
      aviso.textContent = "Listo. Abrimos WhatsApp con tu mensaje para que lo envíes con un toque.";
      aviso.classList.add("visible");
    }

    window.open(enlaceWhatsApp(texto), "_blank", "noopener");
    form.reset();
  });
}

/* ------------------------------------------------------------- Video del tutorial */

function iniciarVideo() {
  const botones = $$("[data-video]");
  if (!botones.length) return;

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = boton.getAttribute("data-video");
      if (!id) return;

      const marco = document.createElement("iframe");
      marco.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      marco.title = boton.getAttribute("aria-label") || "Tutorial de Buzón SOL";
      marco.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      marco.allowFullscreen = true;
      marco.loading = "eager";

      const caja = document.createElement("div");
      caja.className = "video video--cargado";
      caja.appendChild(marco);
      boton.replaceWith(caja);
    });
  });
}

/* ------------------------------------------------------------- Varios */

function iniciarVarios() {
  $$("[data-anio]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* ------------------------------------------------------------- Arranque */

document.addEventListener("DOMContentLoaded", () => {
  iniciarTema();
  iniciarMenu();
  iniciarWhatsApp();
  iniciarFormulario();
  iniciarLicencia();
  iniciarVideo();
  iniciarVarios();
});


/* ------------------------------------------------------------- WhatsApp flotante */

(() => {
  if (document.querySelector(".wa-flotante")) return;
  const enlace = document.createElement("a");
  enlace.className = "wa-flotante";
  enlace.href = enlaceWhatsApp("Hola, quiero información sobre Buzón SOL.");
  enlace.target = "_blank";
  enlace.rel = "noopener";
  enlace.setAttribute("aria-label", "Escribir por WhatsApp a Apps Contables");
  enlace.innerHTML =
    '<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29z"/></svg>';
  document.body.appendChild(enlace);
})();
