const SUPABASE_URL = 'https://iebufahobqzapgkatnoc.supabase.co/';
const SUPABASE_KEY = 'sb_publishable_p89dhhXDyVBghroDrfK1qg_BPlxxid8'; 

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const formLogin = document.getElementById('form-login');
const seccionResultados = document.getElementById('seccion-resultados');
const tablaDatos = document.getElementById('tabla-datos');

// 1. Iniciar sesión
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Contraseña incorrecta o no eres tú.");
    } else {
        formLogin.style.display = 'none';
        seccionResultados.style.display = 'block';
        cargarRespuestas();
    }
});

/// 2. Cargar y pintar las respuestas de forma bonita
async function cargarRespuestas() {
    const { data, error } = await supabaseClient
        .from('respuestas')
        .select('*')
        .eq('leido', false);

    if (error) {
        console.error("Error al cargar:", error);
    } else {
        const cuerpoTabla = document.getElementById('cuerpo-tabla');
        cuerpoTabla.innerHTML = ''; // Limpiamos la tabla antes de pintar

        data.forEach((fila) => {
            const tr = document.createElement('tr');
            
            // Si quieres cambiar el diseño si ya está leído (puedes añadir una columna booleana 'leido' a tu tabla si lo deseas)
            tr.innerHTML = `
                <td class="celda">${fila.edad}</td>
                <td class="celda">${fila.profesion}</td>
                <td class="celda">${fila.dispositivo}</td>
                <td class="celda">${fila.problema}</td>
                <td class="celda">${fila.solucion_act}</td>
                <td class="celda">
                    <button class="btn-leido" onclick="leido(${fila.id})" id="${fila.id}" >
                        Marcar leído
                    </button>
                </td>
            `;
            cuerpoTabla.appendChild(tr);
        });

        
    }
}

async function leido(id) {

    const {data, error} = await supabaseClient
        .from('respuestas')
        .update({ leido: true })
        .eq('id', id);

    if (error) {
        console.error("Error al marcar como leído:", error);
    } else {
        document.getElementById(id).disabled = true;
        document.getElementById(id).textContent = 'Leído ✓';
        document.getElementById(id).style.backgroundColor = '#10b981';
    }

    
}

// 3. Control del checkbox para ver la contraseña
const checkboxMostrar = document.getElementById('mostrar');
const inputPassword = document.getElementById('password');

if (checkboxMostrar && inputPassword) {
    checkboxMostrar.addEventListener('change', function () {
        inputPassword.type = this.checked ? 'text' : 'password';
    });
}
