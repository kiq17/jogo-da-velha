let tabuleiro = ['', '', '', '', '', '', '', '', ''];
let vezDoJogador = 0
const simbolos = ['o', 'x'];
let fim = false;

const quadrados = document.querySelectorAll('.quadrado')
const modalInfo = document.querySelector('.vencedor')
const modal = document.querySelector('.back-modal')
const fechar = document.getElementById('fechar')

fechar.addEventListener('click', () => {
    modal.classList.remove('ativo')

    /* reinicio do jogo */

    const p = document.querySelectorAll('p')

    p.forEach(p => {
        p.remove()
    })

    tabuleiro = ['', '', '', '', '', '', '', '', ''];

    fim = false
})


quadrados.forEach(quadrado => {
    quadrado.addEventListener('click', inserirIcone)
})

function inserirIcone(e) {
    let quadrado = e.target
    let id = quadrado.id

    if (movimento(id)) {
        setTimeout(() => {
            modal.classList.add('ativo')
        }, 300)

        if (vezDoJogador == 0) {
            modalInfo.innerText = 'O'
        } else {
            modalInfo.innerText = 'X'
        }
    }
    inserirSimbolo()
}

function movimento(posicao) {

    if (fim) {
        return
    }

    if (tabuleiro[posicao] == '') {
        tabuleiro[posicao] = simbolos[vezDoJogador]

        fim = ganhador();

        if (!fim) {

            if (vezDoJogador == 0) {
                vezDoJogador = 1
            } else {
                vezDoJogador = 0
            }
        }
    }

    return fim;

}

function inserirSimbolo() {
    quadrados.forEach(quadrado => {
        let posicao = quadrado.id
        let simbolo = tabuleiro[posicao]

        if (simbolo != '') {
            quadrado.innerHTML = `<p class="${simbolo}"></p>`
        }
    })
}


function ganhador() {
    const combinacao = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [6, 4, 2],
        [0, 4, 8]
    ]


    for (i = 0; i < combinacao.length; i++) {
        const sequencia = combinacao[i]

        let pos1 = sequencia[0]
        let pos2 = sequencia[1]
        let pos3 = sequencia[2]

        if (tabuleiro[pos1] == tabuleiro[pos2] && tabuleiro[pos1] == tabuleiro[pos3] && tabuleiro[pos1] != '') {
            return true
        }
    }

    /* verificando se todos os icones estão preenchidos */
    const icones = document.querySelectorAll('p')
    if (icones.length == 8) {
        velha()
    }

    return false;

}

function velha() {
    modal.classList.add('ativo')

    const spanText = document.querySelector('.modal span')

    spanText.textContent = 'Deu Velha'
    modalInfo.textContent = ':('
}