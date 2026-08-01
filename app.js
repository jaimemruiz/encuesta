const SUPABASE_URL = 'https://iebufahobqzapgkatnoc.supabase.co/';
const SUPABASE_KEY = 'sb_publishable_p89dhhXDyVBghroDrfK1qg_BPlxxid8'; 

const conexionBD = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


const formulario = document.getElementById('formulario');


formulario.addEventListener('submit', async function (evento) {

    evento.preventDefault();

    const boton = document.getElementById('enviar');
    boton.disabled = true;
    boton.textContent = 'Enviando...';

    const edad = document.getElementById('edad').value;
    const profesion = document.getElementById('profesion').value;
    const dispositivo = document.getElementById('dispositivo').value;
    const problema = document.getElementById('problema').value;
    const solucion_actual = document.getElementById('solucion_actual').value;

    const {data, error} = await conexionBD
    .from('respuestas')
    .insert([
        {
            edad: edad,
            profesion: profesion,
            dispositivo: dispositivo,
            problema: problema,
            solucion_act: solucion_actual
        }
    ]);
    
    if (error) {
        console.error('Error de Supabase:', error);
        alert('Hubo un error de base de datos. Mira la consola.');
        boton.textContent = 'Enviar';
        boton.disabled = false;
    } else {
        formulario.reset();
        boton.textContent = 'Enviar';
        boton.disabled = false;
    }

})