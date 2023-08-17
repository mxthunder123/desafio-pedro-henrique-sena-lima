class CaixaDaLanchonete {

    constructor() {
    this.cardapio = {
      'cafe': 3.00,
      'chantily': 1.50,
      'suco': 6.20,
      'sanduiche': 6.50,
      'queijo': 2.00,
      'salgado': 7.25,
      'combo1': 9.50,
      'combo2': 7.50,
    };

    this.metodoDePagamento = {
      'dinheiro': 0.05,
      'debito': 0,
      'credito': 0.03,
    };
  }

    calcularValorDaCompra(metodoDePagamento, itens) {
       const itemsMap = new Map();
        let total = 0;

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');
            if (codigo in this.cardapio) {
                itemsMap.set(codigo, (itemsMap.get(codigo) || 0) + parseInt(quantidade));
            } else {
                return "Item inválido!";
            }
        }

        for (const [codigo, quantidade] of itemsMap) {
            if (codigo !== 'chantily' && codigo !== 'queijo') {
            total += this.cardapio[codigo] * quantidade;
            }
        }

        if (itemsMap.has('cafe') && itemsMap.has('chantily')) {
            total += itemsMap.get('chantily') * this.cardapio['chantily'];
        }

        if (itemsMap.has('queijo') && itemsMap.has('sanduiche')) {
            total += itemsMap.get('queijo') * this.cardapio['queijo'];
        }

        if (itemsMap.has('chantily') && !itemsMap.has('cafe')) {
            return "Item extra não pode ser pedido sem o principal";
          }

        if (itemsMap.has('queijo') && !itemsMap.has('sanduiche')) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (itemsMap.size === 0) {
        return "Não há itens no carrinho de compra!";
        }

        if (total === 0) {
        return "Quantidade inválida!";
        }

        const formaPagamentoInfo = this.metodoDePagamento[metodoDePagamento];
        if (formaPagamentoInfo === undefined) {
        return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento == "dinheiro"){
            total = total * (1 - formaPagamentoInfo);
        }

        else if (metodoDePagamento == "credito"){
            total = total * (1 + formaPagamentoInfo);
        }
        else{
            total = total * (1 + formaPagamentoInfo);
        }
        

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}




export { CaixaDaLanchonete };
