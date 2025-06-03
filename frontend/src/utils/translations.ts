// Mapeamento de faixas inglês -> português
export const beltTranslations: { [key: string]: string } = {
  'white': 'Branca',
  'blue': 'Azul',
  'purple': 'Roxa',
  'brown': 'Marrom',
  'black': 'Preta'
};

// Função para traduzir faixa
export const translateBelt = (belt: string | undefined | null): string => {
  if (!belt) return 'Sem faixa';
  return beltTranslations[belt.toLowerCase()] || belt;
};

// Mapeamento de artes marciais
export const martialArtTranslations: { [key: string]: string } = {
  'jiujitsu': 'Jiu-Jitsu',
  'muaythai': 'Muay Thai'
};

// Função para traduzir arte marcial
export const translateMartialArt = (art: string): string => {
  return martialArtTranslations[art.toLowerCase()] || art;
}; 