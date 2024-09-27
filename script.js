document.addEventListener('DOMContentLoaded', function () {
    let pacientes = [];
    let medicamentos = [];

    // Cargar los datos de pacientes y medicamentos
    fetch('pacientes.json')
        .then(response => response.json())
        .then(data => {
            pacientes = data;
        });

    fetch('medicamentos.json')
        .then(response => response.json())
        .then(data => {
            medicamentos = data;
        });

    // Función para buscar pacientes por nombre
    document.getElementById('buscarPacientes').addEventListener('input', function() {
        let searchValue = this.value.toLowerCase();
        fetch('pacientes.json')
            .then(response => response.json())
            .then(data => {
                let results = data.filter(paciente => 
                    paciente.nombre.toLowerCase().includes(searchValue)
                );
                let resultList = document.getElementById('resultPacientes');
                resultList.innerHTML = '';
                results.forEach(paciente => {
                    let li = document.createElement('li');
                    li.textContent = paciente.nombre;
                    li.addEventListener('click', function() {
                        selectedPatient = paciente;
                        document.getElementById('patientIdField').classList.remove('hidden-info');
                    });
                    resultList.appendChild(li);
                });
            })
            .catch(error => console.error('Error al buscar pacientes:', error));
    });

    // Función para ingresar el ID del paciente y mostrar información
    document.getElementById('submitId').addEventListener('click', function() {
        let enteredId = document.getElementById('patientId').value;
        if (selectedPatient && selectedPatient.id_paciente == enteredId) {
            // Mostrar la información del paciente
            document.getElementById('edad').textContent = selectedPatient.edad;
            document.getElementById('fechaAlta').textContent = selectedPatient.fecha_alta;
            document.getElementById('diagnostico').textContent = selectedPatient.diagnostico;
            document.getElementById('fechaCita').textContent = selectedPatient.fecha_cita;

            // Mostrar la sección de información
            document.getElementById('patientInfo').classList.remove('hidden-info');
        } else {
            alert('ID incorrecto. Intenta de nuevo.');
        }
    });

    // Código para mostrar tablas JSON/XML (no modificado)
    document.getElementById('btnPacientes').addEventListener('click', function() {
        fetch('pacientes.json')
            .then(response => response.json())
            .then(data => {
                let html = '<h2>Información de Pacientes (JSON)</h2>';
                html += `
                    <table>
                        <tr>
                            <th>ID Paciente</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Fecha de Alta</th>
                            <th>Diagnóstico</th>
                            <th>Fecha de Cita</th>
                        </tr>`;
                data.forEach(paciente => {
                    html += `
                        <tr>
                            <td>${paciente.id_paciente}</td>
                            <td>${paciente.nombre}</td>
                            <td>${paciente.edad}</td>
                            <td>${paciente.fecha_alta}</td>
                            <td>${paciente.diagnostico}</td>
                            <td>${paciente.fecha_cita}</td>
                        </tr>`;
                });
                html += '</table>';
                document.getElementById('contenido').innerHTML = html;
            })
            .catch(error => console.error('Error al cargar los datos de pacientes:', error));
    });

    // Función de búsqueda de medicamentos
    document.getElementById('searchMedicamentos').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const resultados = medicamentos.filter(medicamento =>
            medicamento.nombre.toLowerCase().includes(query)
        );
        const listaResultados = document.getElementById('resultMedicamentos');
        listaResultados.innerHTML = '';
        resultados.forEach(medicamento => {
            const li = document.createElement('li');
            li.textContent = `${medicamento.nombre} (${medicamento.dosis}), Caduca: ${medicamento.fecha_caducidad}`;
            listaResultados.appendChild(li);
        });
    });

    // Funciones originales para mostrar pacientes y medicamentos en tablas
    document.getElementById('btnPacientes').addEventListener('click', function () {
        fetch('pacientes.json')
            .then(response => response.json())
            .then(data => {
                let html = '<h2>Información de Pacientes (JSON)</h2>';
                html += `
                    <table>
                        <tr>
                            <th>ID Paciente</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Fecha de Alta</th>
                            <th>Diagnóstico</th>
                            <th>Fecha de Cita</th>
                        </tr>`;
                data.forEach(paciente => {
                    html += `
                        <tr>
                            <td>${paciente.id_paciente}</td>
                            <td>${paciente.nombre}</td>
                            <td>${paciente.edad}</td>
                            <td>${paciente.fecha_alta}</td>
                            <td>${paciente.diagnostico}</td>
                            <td>${paciente.fecha_cita}</td>
                        </tr>`;
                });
                html += '</table>';
                document.getElementById('contenido').innerHTML = html;
            })
            .catch(error => console.error('Error al cargar los datos de pacientes:', error));
    });

    document.getElementById('btnMedicamentos').addEventListener('click', function () {
        fetch('medicamentos.json')
            .then(response => response.json())
            .then(data => {
                let html = '<h2>Información de Medicamentos (JSON)</h2>';
                html += `
                    <table>
                        <tr>
                            <th>Clave</th>
                            <th>Nombre</th>
                            <th>Vía de Administración</th>
                            <th>Dosis</th>
                            <th>Contenido Neto</th>
                            <th>Fecha de Caducidad</th>
                        </tr>`;
                data.forEach(medicamento => {
                    html += `
                        <tr>
                            <td>${medicamento.clave}</td>
                            <td>${medicamento.nombre}</td>
                            <td>${medicamento.via_administracion}</td>
                            <td>${medicamento.dosis}</td>
                            <td>${medicamento.contenido_neto}</td>
                            <td>${medicamento.fecha_caducidad}</td>
                        </tr>`;
                });
                html += '</table>';
                document.getElementById('contenido').innerHTML = html;
            })
            .catch(error => console.error('Error al cargar los datos de medicamentos:', error));
    });
});
