document.getElementById('btnSearch').addEventListener('click', function () {
    const input = document.getElementById('conditionInput').value.toLowerCase().trim();
  
    // Normalización básica
    let keyword = '';
    if (input.includes("playa")) {
      keyword = 'playa';
    } else if (input.includes("templo")) {
      keyword = 'templo';
    } else if (input.includes("méxico") || input.includes("mexico") || input.includes("colombia") || input.includes("japón") || input.includes("japon")) {
      keyword = 'pais';
    } else {
      keyword = 'otro';
    }
  
    buscarRecomendaciones(keyword);
  });

  function buscarRecomendaciones(categoria) {
    fetch('./travel_recommendation.json')
      .then(response => response.json())
      .then(data => {
        const contenedor = document.getElementById('report');
        contenedor.innerHTML = ''; // Limpia resultados anteriores
  
        if (data[categoria]) {
          data[categoria].forEach(lugar => {
            const card = document.createElement('div');
            card.className = 'recomendacion';
  
            card.innerHTML = `
              <h2>${lugar.nombre}</h2>
              <img src="./images/${lugar.imagen}" alt="${lugar.nombre}" width="300">
              <p>${lugar.descripcion}</p>
            `;
  
            contenedor.appendChild(card);
          });
        } else {
          contenedor.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        }
      })
      .catch(error => console.error('Error al cargar las recomendaciones:', error));
  }

  document.getElementById('btnClear').addEventListener('click', function () {
    document.getElementById('conditionInput').value = '';
    document.getElementById('report').innerHTML = '';
  });

  function buscarRecomendaciones(categoria) {
    fetch('./travel_recommendation.json')
      .then(response => response.json())
      .then(data => {
        const contenedor = document.getElementById('report');
        contenedor.innerHTML = ''; // Limpia resultados anteriores
  
        if (data[categoria]) {
          data[categoria].forEach(lugar => {
            const card = document.createElement('div');
            card.className = 'recomendacion';
  
            // Obtener la hora si el lugar tiene zona horaria
            let horaLocal = '';
            if (lugar.zonaHoraria) {
              const options = {
                timeZone: lugar.zonaHoraria,
                hour12: true,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              };
              horaLocal = new Date().toLocaleTimeString('en-US', options);
            }
  
            card.innerHTML = `
              <h2>${lugar.nombre}</h2>
              <img src="./images/${lugar.imagen}" alt="${lugar.nombre}" width="300">
              <p>${lugar.descripcion}</p>
              ${horaLocal ? `<p><strong>Hora local:</strong> ${horaLocal}</p>` : ''}
            `;
  
            contenedor.appendChild(card);
          });
        } else {
          contenedor.innerHTML = '<p>No se encontraron resultados para tu búsqueda.</p>';
        }
      })
      .catch(error => console.error('Error al cargar las recomendaciones:', error));
  }