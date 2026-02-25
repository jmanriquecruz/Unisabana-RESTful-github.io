window.startFlow = function () {
document.querySelector(".arrow-vertical").style.opacity = 0;
  // ===== Obtener valores dinámicos =====
  const method = document.getElementById("method").value;
  const url = document.getElementById("url").value || "/api/orders";

  const request = document.querySelector(".request");
  const response = document.querySelector(".response");
  const headersOutput = document.getElementById("headersOutput");
  const statusBox = document.getElementById("statusCodeBox");
  const apiBox = document.querySelector(".api");
  const methodLabel = document.getElementById("httpMethodLabel");
  const latencyBox = document.getElementById("latencyBox");

  const arrowRequest = document.querySelector(".arrow-request");
  const arrowResponse = document.querySelector(".arrow-response");

  // ===== RESET VISUAL =====
  request.style.opacity = 0;
  response.style.opacity = 0;
  arrowRequest.style.opacity = 0;
  arrowResponse.style.opacity = 0;

  statusBox.classList.remove("show", "status-success", "status-error");
  apiBox.classList.remove("processing", "api-error");

  latencyBox.style.opacity = 0;

  // ===== Mostrar método dinámico =====
  methodLabel.textContent = `${method} ${url}`;

  // ===== Headers dinámicos =====
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  };

  headersOutput.textContent = JSON.stringify(headers, null, 2);

  // ===== Simular latencia =====
  const latency = Math.floor(Math.random() * 200) + 50;
  latencyBox.textContent = `${latency} ms`;
  latencyBox.style.opacity = 1;

  // ===== Animar REQUEST =====
  request.style.opacity = 1;
  arrowRequest.style.opacity = 1;

  request.animate([
    { left: "15%" },
    { left: "45%" },
    { left: "75%" }
  ], {
    duration: 2000,
    easing: "ease-in-out"
  });

  // ===== Procesamiento interno API =====
  setTimeout(() => {
    apiBox.classList.add("processing");
     document.querySelector(".arrow-vertical").style.opacity = 1;
  }, 1000);

  // ===== Simular validación REST =====
  setTimeout(() => {

    let isValid = url.startsWith("/api") && !url.includes("error");

    let statusCode = isValid ? "201 Created" : "400 Bad Request";

    statusBox.textContent = statusCode;
    statusBox.classList.add("show");

    if (isValid) {
      statusBox.classList.add("status-success");
    } else {
      statusBox.classList.add("status-error");
      apiBox.classList.add("api-error");
    }

    // ===== Animar RESPONSE =====
    response.style.opacity = 1;
    arrowResponse.style.opacity = 1;

    response.animate([
      { right: "15%" },
      { right: "45%" },
      { right: "75%" }
    ], {
      duration: 2000,
      easing: "ease-in-out"
    });

  }, 2200);

};