var dictionary = {
    'resume': {
        'en': '<a href="CV_Renan_EN.pdf" class="genric-btn primary-border circle" target="_blank">Resume</a>',
        'pt-br': '<a  href="CV_Renan_BR.pdf" class="genric-btn primary-border circle" target="_blank">Curriculo</a>'
    },
    'about_me': {
        'en': 'About Me',
        'pt-br': 'Sobre Mim'
    },
    'portfolio': {
        'en': 'Portfolio',
        'pt-br': 'Portfólio'
    },
    'lastest_port_title': {
        'en': 'Back-end Developer using Python and Flask for Astronomy group (SRGAC) at EFET (Brazil)',
        'pt-br': 'Desenvolvedor Back-end usando Python e Flask para o Grupo de Astronomia (GEPAC) do IFCE '
    },
    'lastest_port_content': {
        'en': 'I am currently working as a back-end developer for the Study and Research Group in Astronomy and Cosmology at EFET (Brazil). I am developing a web application using Python and Flask to help the group to manage their data from events and from blog posts. The application is hosted on Heroku and the code is available on GitHub.',
        'pt-br': 'Atualmente estou trabalhando como desenvolvedor back-end para o Grupo de Estudos e Pesquisas em Astronomia e Cosmologia (GEPAC) do Instituto Federal do Ceará (IFCE). Estou desenvolvendo uma aplicação web usando Python e Flask para ajudar o grupo a gerenciar seus dados de eventos e de posts do blog. A aplicação está hospedada no Heroku e o código está disponível no GitHub.'
    },
    'lastest_port_date': {
        'en': 'Renan Cavalcante on January 17, 2023',
        'pt-br': 'Renan Cavalcante em 17 de Janeiro de 2023'
    },
    'frontend_port_title': {
        'en': 'Front-end Developer using HTML, CSS, JavaScript and Bootstrap 5 for Astronomy group (SRGAC) at EFET (Brazil)',
        'pt-br': 'Desenvolvedor Front-end usando HTML, CSS, JavaScript e Bootstrap 5 para o Grupo de Astronomia (GEPAC) do IFCE '
    },
    'frontend_port_content': {
        'en': 'I am currently working as a front-end developer for the Study and Research Group in Astronomy and Cosmology at EFET (Brazil). I am developing a web application using HTML, CSS, JavaScript and Bootstrap 5',
        'pt-br': 'Atualmente estou trabalhando como desenvolvedor front-end para o Grupo de Estudos e Pesquisas em Astronomia e Cosmologia (GEPAC) do Instituto Federal do Ceará (IFCE). Estou desenvolvendo uma aplicação web usando HTML, CSS, JavaScript e Bootstrap 5'
    },
    'first_port_title': {
        'en': 'A response Test script with Selenium',
        'pt-br': 'Um script de teste de resposta com Selenium'
    },
    'first_port_content': {
        'en': 'A selenium script that tests a dashboards response from Looqbox.',
        'pt-br': 'Um script selenium que testa a resposta de um dashboard da Looqbox.'
    },
    'first_port_date': {
        'en': 'Renan Cavalcante on October 25, 2022',
        'pt-br': 'Renan Cavalcante em 25 de Outubro de 2020'
    },
    'second_port_title': {
        'en': 'A Python package for generate random filters for Looqbox responses',
        'pt-br': 'Um pacote Python para gerar filtros aleatórios para respostas da Looqbox'
    },
    'second_port_content': {
        'en': 'A package to generate random filters like date, store ids, date partitions and more. For use in Looqbox responses.',
        'pt-br': 'Um pacote para gerar filtros aleatórios como data, ids de lojas, partições de data e muito mais. Para uso em respostas da Looqbox.'
    },
    'second_port_date': {
        'en': 'Renan Cavalcante on December 05, 2022',
        'pt-br': 'Renan Cavalcante em 05 de Dezembro de 2020'
    },
    'third_port_title': {
        'en': 'A Treasure trails API for Runescape 3',
        'pt-br': 'Uma API para Treasure Trails do Runescape 3'
    },
    'third_port_content': {
        'en': 'A simple API for Runescape 3 Treasure Trails. It uses the Runescape API to get the quantity of clues done and rank per tier of clue.',
        'pt-br': 'Uma API simples para Treasure Trails do Runescape 3. Ela usa a API do Runescape para obter a quantidade de clues feitos e a posição no ranking por tier de clue.'
    },
    'third_port_date': {
        'en': 'Renan Cavalcante on December 04, 2022',
        'pt-br': 'Renan Cavalcante em 04 de Dezembro de 2020'
    },
    'fourth_port_title': {
        'en': 'A simple API for Brazil Elections Results',
        'pt-br': 'Uma API simples para resultados de eleições no Brasil'
    },
    'fourth_port_content': {
        'en': 'A simple API for Brazil Elections Results. It uses the TSE API to get the results of the elections.',
        'pt-br': 'Uma API simples para resultados de eleições no Brasil. Ela usa a API do TSE para obter os resultados das eleições.'
    },
    'fourth_port_date': {
        'en': 'Renan Cavalcante on October 31, 2022',
        'pt-br': 'Renan Cavalcante em 31 de Outubro de 2020'
    },
    'about_this_page': {
        'en': 'About This Page',
        'pt-br': 'Sobre Esta Página'
    },
    'first_about_this_page_content': {
        'en': 'This website was coded in HTML, CSS, and Javascript based on CV from <a href="https://github.com/harrisonjansma/harrisonjansma.github.io" target="_blank">Harrison Jansma</a>',
        'pt-br': 'Este site foi programado em HTML, CSS e Javascript com base no CV de <a href="https://github.com/harrisonjansma/harrisonjansma.github.io" target="_blank">Harrison Jansma</a>'
    },
    'second_about_this_page_content': {
        'en': 'Copyright &copy; 2020 All rights reserved | This template is made with by <a href="https://colorlib.com" target="_blank">Colorlib</a>',
        'pt-br': 'Copyright &copy; 2020 Todos os direitos reservados | Este modelo é feito com por <a href="https://colorlib.com" target="_blank">Colorlib</a>'
    },
    'follow_me': {
        'en': 'Follow Me',
        'pt-br': 'Siga-me'
    },
    'social_media': {
        'en': 'Let\'s be social. ',
        'pt-br': 'Vamos ser sociais.'
    }
};
const langs = ['en', 'pt-br'];
var current_lang_index = 0;
var current_lang = langs[current_lang_index];

window.change_lang = function () {
    current_lang_index = ++current_lang_index % 2;
    current_lang = langs[current_lang_index];
    translate();
}

function translate() {
    $("[data-translate]").each(function () {
        var key = $(this).data('translate');
        $(this).html(dictionary[key][current_lang] || "N/A");
        write_lang_in_html_with_p_tag();
    });
}

function write_lang_in_html_with_p_tag() {
    if (window.innerWidth < 768) {
        $(".writeHereMobile").html("<img src='img/" + current_lang + ".png' alt='' width='50' height='50'>");
    } else {
        $("#writeHere").html("<img src='img/" + current_lang + ".png' alt='' width='30' height='30'>");
    }
}

setInterval(write_lang_in_html_with_p_tag, 1000);

translate();