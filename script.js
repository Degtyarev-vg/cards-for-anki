new Vue({
  el: '#editor',
  data: {
    hint: false,
    input: '# Heading H1\n' +
      '## Heading H2\n' +
      '### Heading H3\n' +
      '#### Heading H4\n' +
      '##### Heading H5\n' +
      '###### Heading H6\n' +
      '\n' +
      '~~Зачеркнутый текст~~\n' +
      '*курсив*\n' +
      '**жирный**\n' +
      '[Ссылка](http://example.com/link)\n' +
      '\n' +
      '***\n' +
      '\n' +
      '![](https://placehold.it/150x100)\n' +
      '\n' +
      '\n' +
      '* Пункт ненумерованного списка 1\n' +
      '* Пункт ненумерованного списка 2\n' +
      '    * Пункт ненумерованного списка 2.1\n' +
      '    * Пункт ненумерованного списка 2.2\n' +
      '* Пункт ненумерованного списка 3\n' +
      '\n' +
      '\n' +
      '0. Пункт нумерованного списка 1\n' +
      '0. Пункт нумерованного списка 2\n' +
      '0. Пункт нумерованного списка 3\n' +
      '\n' +
      '\n' +
      '* Абзац в ненумерованном списке 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.\n' +
      '\n' +
      '* Абзац в ненумерованном списке 2. Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.\n' +
      '\n' +
      '* Абзац в ненумерованном списке 3. Ea, quis, alias nobis porro quos laborum minus sed fuga odio dolore natus quas cum enim necessitatibus magni provident non saepe sequi?\n' +
      '\n' +
      '\n' +
      '> Цитата. This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,\n' +
      'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.\n' +
      'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.\n' +
      '>\n' +
      '> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse\n' +
      'id sem consectetuer libero luctus adipiscing1.\n' +
      '\n' +
      'Обычный абзац 1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur ducimus est nemo reprehenderit! Aspernatur blanditiis debitis dignissimos, eaque error eveniet illum incidunt inventore laudantium natus possimus praesentium tempore ullam vel veritatis vero, vitae? Adipisci ea ex molestiae odio ullam. Adipisci cupiditate debitis doloribus et fugiat, in maiores nostrum ut?\n' +
      '\n' +
      'Обычный абзац 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consectetur ducimus est nemo reprehenderit! Aspernatur blanditiis debitis dignissimos, eaque error eveniet illum incidunt inventore laudantium natus possimus praesentium tempore ullam vel veritatis vero, vitae?\n' +
      '\n' +
      '```javascript\n' +
      'class Animal {\n' +
      '  constructor(name) {\n' +
      '    this.speed = 0;\n' +
      '    this.name = name;\n' +
      '  }\n' +
      '  run(speed) {\n' +
      '    this.speed += speed;\n' +
      '    alert(`${this.name} бежит со скоростью ${this.speed}.`);\n' +
      '  }\n' +
      '  stop() {\n' +
      '    this.speed = 0;\n' +
      '    alert(`${this.name} стоит.`);\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      '// Наследуем от Animal указывая "extends Animal"\n' +
      'class Rabbit extends Animal {\n' +
      '  hide() {\n' +
      '    alert(`${this.name} прячется!`);\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      'let rabbit = new Rabbit("Белый кролик");\n' +
      '\n' +
      'rabbit.run(5); // Белый кролик бежит со скоростью 5.\n' +
      'rabbit.hide(); // Белый кролик прячется!\n' +
      '\n' +
      'new User().sayHi(); // Привет\n' +
      '\n' +
      'function sayHi(phrase, who) {\n' +
      '  alert( phrase + \', \' + who );\n' +
      '}\n' +
      '\n' +
      'setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон\n' +
      '```\n' +
      '\n' +
      '<div class="table">\n' +
      '\n' +
      '- | Math.floor | Math.ceil | Math.round | Math.trunc\n' +
      ':--- | :---: | :---: | :---:| ---:\n' +
      '**3.1** | 3\t| 4 | 3\t| 3\n' +
      '**3.6**| 3\t| 4 | 4\t| 3\n' +
      '**-1.1** | -2 | -1\t| -1 | -1\n' +
      '**-1.6** | -2 | -1\t| -2 | -1\n' +
      '\n' +
      '</div>\n'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(
        this.input,
        {
          headerIds: false
        })
    }
  },
  methods: {
    update: function(e) {
      this.input = e.target.value;
    },
    copyHtml: function() {
      let target = document.querySelector('.content').innerHTML;
      navigator.clipboard.writeText(target)
        .then(() => {
          this.hint = true;
          setTimeout(() => {
            this.hint = false;
          }, 3000)
        })
        .catch(err => {
          console.log('Something went wrong', err);
        })
    },
    wrapElement(elem, type) {
      let textComponent = document.querySelector('.editor-textarea');
      let selectedText;

      if (textComponent.selectionStart !== undefined) {
        let startPos = textComponent.selectionStart;
        let endPos = textComponent.selectionEnd;
        selectedText = textComponent.value.substring(startPos, endPos);
        if (selectedText) {
          let v = textComponent.value.substring(0, startPos);
          if (type == 'tag') {
            v += `<${elem}>${selectedText}</${elem}>`;
          } else if (type == 'js') {
            v += `\`\`\`javascript\n${selectedText}\n\`\`\``;
          } else {
            v += `${elem}${selectedText}${elem}`;
          }
          v += textComponent.value.substring(endPos);

          textComponent.value = v;
        }
      }
    }
  },
  updated: function() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
})
