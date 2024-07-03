export class CommonMethods {

    static generateName(length = 10) {
        let result = '';
        const vocales = ['a','e','i','o','u'];
        const consonantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'y', 'z'];
    
        function obtenerSilaba() {
            const consonante = consonantes[Math.floor(Math.random() * consonantes.length)];
            const vocal = vocales[Math.floor(Math.random() * vocales.length)];
            return consonante + vocal;
        }
    
        function generateName() {
            let nombre = '';
            while(nombre.length < length) {
                nombre += obtenerSilaba();
            }
            return nombre.substring(0, length).charAt(0).toUpperCase() + nombre.substring(1, length);
        }
    
        return generateName();
    }
    
}