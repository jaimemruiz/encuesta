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

// 2. Cargar respuestas
async function cargarRespuestas() {
    const { data, error } = await supabaseClient
        .from('respuestas')
        .select('*');

    if (error) {
        console.error("Error al cargar:", error);
    } else {
        console.log("Datos secretos:", data);
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
