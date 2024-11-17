// JavaScript
// 1.	Detectar si la cadena de entrada en un palíndromo.
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("formPalindromo")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let palabra = document
        .getElementById("palindromo")
        .value.trim() //Elimina los espacios al inicio y al final
        .toLowerCase() //Convierte a minúsculas
        .replace(/ /g, "") //Elimina todos los espacios
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); //Elimina las tildes

      let palabraInvertida = palabra.split("").reverse().join("");
      if (palabra === palabraInvertida) {
        document.getElementById("resultado1").innerHTML = "¡Es un palíndromo!";
      } else {
        document.getElementById("resultado1").innerHTML =
          "No es un palíndromo.";
      }
    });
});

// 2.	Escribe un programa que pida dos números y escriba en la pantalla cual es el mayor.
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("formNumeroMayor")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del formulario

      let numero1 = parseInt(document.getElementById("numero1").value);
      let numero2 = parseInt(document.getElementById("numero2").value);
      if (numero1 > numero2) {
        document.getElementById("resultado2").innerHTML =
          "El número mayor es: " + numero1;
      } else if (numero1 < numero2) {
        document.getElementById("resultado2").innerHTML =
          "El número mayor es: " + numero2;
      } else {
        document.getElementById("resultado2").innerHTML =
          "Los números son iguales.";
      }
    });
});

// 3.	Escribe un programa que pida una frase y escriba las vocales que aparecen.
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("formVocales")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Evita el comportamiento predeterminado del formulario
      let frase = document
        .getElementById("frase")
        .value.trim() //Elimina los espacios al inicio y al final
        .toLowerCase() //Convierte a minúsculas
        .replace(/ /g, "") //Elimina todos los espacios
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""); //Elimina las tildes
      let vocalesEncontradas = frase.match(/[aeiouáéíóú]/g);
      if (vocalesEncontradas) {
        document.getElementById(
          "resultado3"
        ).innerHTML = `Vocales encontradas: ${[
          ...new Set(vocalesEncontradas),
        ].join(", ")}`;
      } else {
        document.getElementById("resultado3").innerHTML =
          "No se encontraron vocales en la frase.";
      }
    });
});

// 4.	Escribe un programa que pida una frase y escriba cuántas veces aparecen cada una de las vocales.
document
  .getElementById("formContarVocales")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let frase = document
      .getElementById("fraseContar")
      .value.trim() //Elimina los espacios al inicio y al final
      .toLowerCase() //Convierte a minúsculas
      .replace(/ /g, "") //Elimina todos los espacios
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); //Elimina las tildes

    let vocales = { a: 0, e: 0, i: 0, o: 0, u: 0 };

    for (let letra of frase) {
      if (vocales.hasOwnProperty(letra)) {
        vocales[letra]++;
      }
    }

    let resultado = Object.entries(vocales)
      .map(([vocal, cantidad]) => `${vocal.toUpperCase()}: ${cantidad}`)
      .join(", ");

    document.getElementById("resultado4").innerHTML =
      resultado || "No se encontraron vocales en la frase.";
  });

// AJAX
// 1.	Al cargar la página, el cuadro de texto debe mostrar por defecto la URL de la propia página.
document.addEventListener("DOMContentLoaded", () => {
  // Usar AJAX para obtener la URL de la página
  fetch(window.location.href, { method: "GET" })
    .then((response) => {
      if (response.ok) {
        return response.url; // Obtiene la URL del response
      } else {
        throw new Error("No se pudo obtener la URL.");
      }
    })
    .then((url) => {
      document.getElementById(
        "resultado5"
      ).innerHTML = `URL obtenida con AJAX: <strong>${url}</strong>`;
    })
    .catch((error) => {
      document.getElementById(
        "resultado5"
      ).innerHTML = `Error: ${error.message}`;
    });
});

/* 
    2.	Al pulsar el botón Mostrar Contenidos, se debe descargar mediante peticiones AJAX el contenido correspondiente a la URL introducida por el usuario. El contenido de la respuesta recibida del servidor en se debe mostrar en la zona de Contenidos del archivo.
    3.	En la zona Estados de la petición se debe mostrar en todo momento el estado en el que se encuentra la petición (no iniciada, cargando, completada, etc.).
    4.	Mostrar el contenido de todas las cabeceras de la respuesta del servidor en la zona Cabeceras HTTP de la respuesta del servidor.
    5.	Mostrar el código y texto de la respuesta del servidor en la zona Código de estado.

*/
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("formMostrarContenidos")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita que se recargue la página

      const url = document.getElementById("urlInput").value; // Obtener la URL ingresada
      const zonaContenidos = document.getElementById("zonaContenidos"); // Zona donde mostrar los contenidos
      const estadoPeticion = document.getElementById("estadoPeticion"); // Zona de estado
      const zonaCabeceras = document.getElementById("zonaCabeceras"); // Zona de cabeceras
      const zonaCodigoEstado = document.getElementById("zonaCodigoEstado"); // Zona de código de estado

      // Validar que la URL no esté vacía
      if (!url) {
        zonaContenidos.innerHTML =
          "<p style='color: red;'>Por favor, ingrese una URL válida.</p>";
        return;
      }

      try {
        estadoPeticion.innerHTML =
          "<p style='color:yellow'>Estado: Cargando...</p>"; // Actualiza el estado a "Cargando"
        const response = await fetch(url);

        if (!response.ok) {
            zonaCodigoEstado.innerHTML = `<p style='color:red'>Código: ${response.status}, Texto: ${response.statusText}</p>`;
          throw new Error(
            `Error ${response.status}: No se pudo obtener el contenido.`
          );
        }

        const data = await response.text(); // Obtener la respuesta como texto

        // Mostrar todas las cabeceras en la consola y en la zonaCabeceras
        const headers = [...response.headers.entries()]
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        

        // Mostrar las cabeceras en la zonaCabeceras
        zonaCabeceras.innerHTML = `<p style='color:#39FF14'>${headers}</p>`;

        // Mostrar el código y texto de la respuesta del servidor
        zonaCodigoEstado.innerHTML = `<p style='color:#39FF14'>Código: ${response.status}, Texto: ${response.statusText}</p>`;

        estadoPeticion.innerHTML =
          "<p style='color:#39FF14'>Estado: Completado</p>"; // Estado completado
        zonaContenidos.innerHTML = `<p>${data}</p>`; // Mostrar contenido
      } catch (error) {

        estadoPeticion.innerHTML = "<p style='color: red;'>Estado: Fallido</p>"; // Estado fallido

        zonaContenidos.innerHTML = `<p style="color: red;">Error al obtener el contenido: ${error.message}</p>`;

        zonaCabeceras.innerHTML = `<p style="color: red;">Error al obtener el contenido: ${error.message}</p>`;
      }
    });
});
