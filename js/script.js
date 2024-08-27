const ingresoTexto = document.getElementById("ingresoTexto");
const botonEncriptar = document.getElementById("botonEncriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const muchacho = document.getElementById("muchacho");
const rightInfo = document.getElementById("rightInfo");
const right = document.getElementById("right");

let remplazar = [
  ["e", "enter"],
  ["i", "imes"],
  ["a", "ai"],
  ["o", "ober"],
  ["u", "ufat"],
];

const remplace = (nuevoValor) => {
  mensajeFinal.innerHTML = nuevoValor;

  muchacho.classList.add("oculto");

  ingresoTexto.value = "";
  rightInfo.style.display = "none";
  botonCopiar.style.display = "block";
  right.classList.add("ajustar");
  mensajeFinal.classList.add("ajustar");
};

const reset = () => {
  mensajeFinal.innerHTML = "";
  muchacho.classList.remove("oculto");
  rightInfo.style.display = "block";
  botonCopiar.style.display = "none";
  right.classList.remove("ajustar");
  mensajeFinal.classList.remove("ajustar");
  ingresoTexto.focus();
};

const validarTexto = (texto) => {
  const regex = /^[a-z\s]*$/;
  return regex.test(texto);
};

const mostrarAlerta = () => {
  alert("El texto solo debe contener letras minúsculas sin acentos.");
  ingresoTexto.focus();
};

botonEncriptar.addEventListener("click", () => {
  const texto = ingresoTexto.value;

  if (texto != "") {
    if (!validarTexto(texto)) {
      mostrarAlerta();
      return;
    }

    const textoEncriptado = encriptar(texto.toLowerCase());
    remplace(textoEncriptado);
  } else {
    alert("Ingrese texto a Encriptar");
    reset();
  }
});

botonDesencriptar.addEventListener("click", () => {
  const texto = ingresoTexto.value;

  if (texto != "") {
    if (!validarTexto(texto)) {
      mostrarAlerta();
      return;
    }

    const textoDesencriptado = desencriptar(texto.toLowerCase());
    remplace(textoDesencriptado);
  } else {
    alert("Ingrese texto a Desencriptar");
    reset();
  }
});

const encriptar = (newText) => {
  for (let i = 0; i < remplazar.length; i++) {
    if (newText.includes(remplazar[i][0])) {
      newText = newText.replaceAll(remplazar[i][0], remplazar[i][1]);
    }
  }
  return newText;
};

const desencriptar = (newText) => {
  for (let i = 0; i < remplazar.length; i++) {
    if (newText.includes(remplazar[i][1])) {
      newText = newText.replaceAll(remplazar[i][1], remplazar[i][0]);
    }
  }
  return newText;
};

botonCopiar.addEventListener("click", () => {
  let texto = mensajeFinal;
  navigator.clipboard.writeText(texto.value);
  alert("Texto Copiado");
  reset();
});
