let produtos = [
    {
      nome : 'Pisotola Airsoft',
      valor: 368,
      id : 1,
      image : 'jogos.jpg',
      descricao : 'Muito utilizada nos campeonatos oficiais de airsoft'
    },
    {
      nome : 'Sniper Airsoft 500m',
      valor: 890,
      id : 2,
      image : 'hp.jpg',
      descricao : 'Um rifle de longo alcance. Chegando até 500m de distancia'
    },
    {
      nome : 'Rifle de Assalto AK47',
      valor: 650,
      id : 3,
      image : 'li.jpg',
      descricao : 'Uma arma com um poder de destruição imenso'
    },
    {
      nome : 'Capacete Airsoft',
      valor: 150,
      id : 4,
      image : 'fh.jpg',
      descricao : 'Um capacete profissional de airsoft para as mais perigosas situações'
    },
    {
      nome : 'Munição 6mm',
      valor: 15,
      id : 5,
      image : 'om.jpg',
      descricao : '2000 unidades de munição de airsoft para calibre 6 mm'
    },
    {
      nome : 'M416 Airsoft',
      valor: 55,
      id : 6,
      image : 'm416.jpg',
      descricao : 'Uma arma muito boa para quem curte automática'
    },
    {
        nome : 'Kar98 Airsoft',
        valor: 1000,
        id : 6,
        image : 'kar.jpg',
        descricao : 'Grande jogadores sabem bem como esta arma é precisa e poderosa'
      }
];

$(function(){

    let $divProdutos = $("#divProdutos");

    function adicionarProdutos(){
        $divProdutos.html("");
        for(let i=0, len = produtos.length; i < len; i++){
            adicionarProduto(produtos[i]);
        }
    }

    function adicionarProduto(produto){
        let template = [
            '<div class="col-sm-4 col-md-3 produto" id="produto'+produto.id+'">',
                '<div class="thumbnail" >',
                    '<img src="img/'+produto.image+'" class="img-responsive">',
                    '<div class="caption">',
                        '<div class="row">',
                            '<div class="col-md-6 col-xs-6">',
                                '<h3>'+produto.nome+'</h3>',
                            '</div>',
                            '<div class="col-md-6 col-xs-6 price">',
                                '<h3><label>R$ '+produto.valor+',00</label></h3>',
                            '</div>',
                        '</div>',
                        '<p>'+produto.descricao+'</p>',
                        '<div class="row">',
                            '<form class="form carrinho" role="form" novalidate>',
                                '<div class="col-md-6 form-group">',
                                    '<input type="number" placeholder="quantidade" class="form-control" name="qtd" min="1" value="1">',
                                '</div>',
                                '<div class="col-md-6">',
                                    '<button type="submit" href="#" class="btn btn-default btn-product"><span class="glyphicon glyphicon-shopping-cart"></span></button>',
                                '</div>',
                            '</form>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');

        $divProdutos.append(template);

        $("form", "#produto"+produto.id).submit(function(){
            let qtd = $("input", this).val();
            qtd = parseInt(qtd);
            addCarrinho(produto, qtd);
            exibirCarrinho();
            return false;
        });
    }

    adicionarProdutos();
});
