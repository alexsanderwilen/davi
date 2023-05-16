export interface Fase {
  nome: string;
  componente: React.ComponentType<any>;
}

export interface FaseProps {
  nome: string;
  componente: React.ComponentType<any> | React.ComponentClass<any, any>;
}

export interface Categoria {
  nome: string;
  fases: Fase[];
}
