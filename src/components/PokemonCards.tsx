// src/components/PokemonCard.tsx
import styled from 'styled-components';
import { useTheme } from 'styled-components';

// Importe de imagem de fundo 
import cardBackground from '../assets/pokefusion_bg11.png'; // Ajuste o caminho

type Props = {
  name: string;
  image: string;
  types: string[];
};

const Card = styled.div<{ bg: string }>`
  background: ${(props) => props.bg};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  text-align: center;
  color: #333;
  position: relative;
  overflow: hidden;
`;

const CardBackground = styled.div`
  background-image: url(${cardBackground});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  width: 75%; // 3/4 do container pai
  height: 75%; // 3/4 do container pai
  margin: 0 auto 1rem; // Centraliza horizontalmente e dá espaçamento abaixo
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokemonImage = styled.img`
  width: 100%;
  max-width: 120px;
  height: auto;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
`;

export default function PokemonCard({ name, image, types }: Props) {
  const theme = useTheme();
  
  const bgGradient = types
    .map((type) => theme.colors?.backgroundType?.[type] || '#fff')
    .slice(0, 2)
    .join(', ');

  return (
    <Card bg={`linear-gradient(135deg, ${bgGradient})`}>
      <CardBackground>
        <PokemonImage src={image} alt={name} />
      </CardBackground>
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <p>Tipos: {types.join(', ')}</p>
    </Card>
  );
}