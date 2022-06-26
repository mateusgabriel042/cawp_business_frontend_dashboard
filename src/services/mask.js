export const maskCep = (value) => {
	return value.replace(/\D/, '').replace(/(\d{5})(\d)/, '$1-$2');
}

export const maskNis = (value) => {
	return value.replace(/\D/, '');
}

export const maskCpf = (value) => {
 	return value
	    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
	    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
	    .replace(/(\d{3})(\d)/, '$1.$2')
	    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
	    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const selectMask = (mask, value) => {
 	if(mask === 'cep')
 		return maskCep(value);
 	else if(mask === 'cpf')
 		return maskCpf(value);
 	else if(mask === 'nis')
 		return maskNis(value);
 	else
 		return value;
}