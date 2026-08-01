import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@+esm'

const supabaseUrl = 'TU_URL_DE_SUPABASE';
const supabaseKey = 'TU_CLAVE_ANON'; // Aquí puedes usar la clave pública normal
const supabase = createClient(supabaseUrl, supabaseKey);

const formLogin = document.getElementById('form-login');
const seccionResultados = document.getElementById('seccion-resultados');
const tablaDatos = document.getElementById('tabla-datos');

// 1. Cuando metas tu correo y contraseña en el móvil y le des a entrar:
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Contraseña incorrecta o no eres tú.");
    } else {
        // ¡Login correcto! Ocultamos el login y cargamos los datos
        formLogin.style.display = 'none';
        seccionResultados.style.display = 'block';
        cargarRespuestas();
    }
});

// 2. Función para descargar y pintar las respuestas
async function cargarRespuestas() {
    const { data, error } = await supabase
        .from('respuestas')
        .select('*');

    if (error) {
        console.error("Error al cargar:", error);
    } else {
        // Aquí dibujas los datos en tu tabla HTML del móvil
        console.log("Datos secretos:", data);
    }
}