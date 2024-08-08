export class clienteAirTagModel{
    constructor(
        public Codigo: number, 
        public MAC:string, 
        public AliasTag:string, 
        public DataInicioLocacao: Date, 
        public DataFimLocacao:Date | null){
        }
}