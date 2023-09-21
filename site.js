window.onload = function() {
  const ajuda = document.createElement('div');
  ajuda.textContent = 'Use "." entre dois numeros para Multiplicar eles, coloque "-" no inicio para retirar ao invés de acrescentar.';
  ajuda.style.position = 'fixed'; 
  ajuda.style.bottom = '0';
  ajuda.style.right = '0'; 
  ajuda.style.marginRight = '10px';
  ajuda.style.marginBottom = '5px';

  const container = document.createElement('div');
  container.style.border = '2px solid black';
  container.style.padding = '10px';
  container.style.maxWidth = '180px';
  container.style.position = 'relative';
  container.style.marginTop = '5px';
  container.style.backgroundColor = '#f0f0f0'; // Defina a cor de fundo
  //container.style.borderRadius = '5px';  Adiciona cantos arredondados mas ainda precisa ser mais bem trabalhado
    
  // Cria campos de entrada e elementos relacionados
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Nome';
    
  const input10 = document.createElement('input');
  input10.type = 'text';
  input10.placeholder = 'Vida';
  input10.style.maxWidth = '75px';
    
  const lifeBar10 = document.createElement('div');
  lifeBar10.innerText = '10/10';
  lifeBar10.style.color = 'red';
  
  const inputdef = document.createElement('input');
  inputdef.type = 'text';
  inputdef.placeholder = 'Defesa';
  inputdef.style.maxWidth = '75px';
  inputdef.style.marginLeft = '10px';
  
  const defbar = document.createElement('div');
  defbar.innerText = '0';
  defbar.style.display = 'inline-block';
  defbar.style.position = 'absolute';
  defbar.style.left = '105px';
  defbar.style.top = '31px';
    
  const input5 = document.createElement('input');
  input5.type = 'text';
  input5.placeholder = 'Mana';
    
  const lifeBar5 = document.createElement('div');
  lifeBar5.innerText = '5/5';
  lifeBar5.style.color = 'blue';
    
  const adicionar = document.createElement('div');
  adicionar.style.width = '70px';
  adicionar.style.height = '20px';
  adicionar.style.border = '2px solid black';
  adicionar.style.display = 'inline-block';
  adicionar.style.textAlign = 'center';
  adicionar.style.margin = '5px';
  adicionar.style.cursor = 'pointer';
  adicionar.style.position = 'absolute'; // Defina a posição como absoluta
  adicionar.style.left = '50%'; // Centralize horizontalmente
  adicionar.style.top = '50%'; // Centralize verticalmente
  adicionar.style.transform = 'translate(-50%, -50%)'; // Centralize o botão
  adicionar.innerText = 'Adicionar';
  adicionar.addEventListener('click', () => {
    const newContainer = container.cloneNode(true);
    newContainer.classList.add('added-container');
    newContainer.style.display = 'block';
    document.body.appendChild(newContainer);
    configureHandlers(newContainer);
  });
    
  // Adiciona campos e botão ao contêiner
  container.appendChild(input);
  container.appendChild(lifeBar10);
  container.appendChild(defbar);
  container.appendChild(input10);
  container.appendChild(inputdef);
  container.appendChild(lifeBar5);
  container.appendChild(input5);
  container.appendChild(adicionar);
    
  // Adiciona o contêiner e adicionar ao corpo do documento
  document.body.appendChild(container);  
  document.body.appendChild(adicionar);
  container.style.display = 'none'; // Inicialmente, oculta o contêiner
  // Adiciona a ajuda no canto inferior direito
  document.body.appendChild(ajuda);
  
  let life10 = 10;
  let maxLife10 = 10;
  
  // Função para configurar manipuladores de eventos para o contêiner
  function configureHandlers(container) {
    const lifeBar10 = container.querySelector('div:nth-child(2)');
    const input10 = container.querySelector('input:nth-child(4)');
    const lifeBar5 = container.querySelector('div:nth-child(6)');
    const input5 = container.querySelector('input:nth-child(7)');
    const defbar = container.querySelector('div:nth-child(3)');
    const inputdef = container.querySelector('input:nth-child(5)');
    

    // Adiciona um manipulador de clique para a barra de vida
  lifeBar10.addEventListener('click', () => {
    const newValue = prompt('Digite o novo valor da Vida Máxima:', maxLife10);
    if (newValue !== null) {
      maxLife10 = parseInt(newValue) || maxLife10;
      life10 = Math.min(life10, maxLife10);
      lifeBar10.innerText = `${life10}/${maxLife10}`;
    }
  });

  
  //---------- Tornando o contêiner selecionável e movível
    // Adicione um identificador ao container para facilitar o manuseio
    container.classList.add('added-container');
    container.style.position = 'absolute'; // Defina a posição como absoluta

    // Adiciona a funcionalidade de mover o container
    let mover = false;
    let offsetX, offsetY;

    container.addEventListener('mousedown', (e) => {
      mover = true;
      offsetX = e.clientX - container.getBoundingClientRect().left;
      offsetY = e.clientY - container.getBoundingClientRect().top;
      container.style.zIndex = '999'; // Coloque o container na frente dos outros
      //e.preventDefault(); Evita a seleção de texto ao clicar mas buga os input então precisa achar outra forma
    });

    document.addEventListener('mousemove', (e) => {
      if (mover) {
        container.style.left = e.clientX - offsetX + 'px';
        container.style.top = e.clientY - offsetY + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      mover = false;
      container.style.zIndex = ''; // Restaure o z-index padrão
    });

    // Adicione a funcionalidade de fechar o container
    const fechar = document.createElement('div');
    fechar.style.width = '20px';
    fechar.style.height = '20px';
    fechar.style.border = '2px solid black';
    fechar.style.display = 'inline-block';
    fechar.style.textAlign = 'center';
    fechar.style.margin = '5px';
    fechar.style.cursor = 'pointer';
    fechar.style.position = 'absolute'; // Defina a posição como absoluta
    fechar.style.top = '-29px'; // Posicione o botão acima do container
    fechar.style.right = '-7px';
    fechar.style.backgroundColor = '#f0f0f0';
    fechar.innerText = 'X';
    
    fechar.addEventListener('click', () => {
      container.remove();
    });

    container.appendChild(fechar);
  //-----------------
  

  // Adiciona um manipulador de evento de pressionar tecla para o campo de entrada de vida
  input10.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const value = input10.value;
      input10.value = '';
  
      let num = 0;
      if (value.includes('.')) {
        const [num1, num2] = value.split('.');
        num = parseInt(num1) * parseInt(num2);
        if (value.startsWith('-') && num2.startsWith('+')) {
          num = -num;
        }
      } else {
        num = parseInt(value);
        if (value.startsWith('+') || value.startsWith('-')) {
          num = parseInt(value.slice(1));
          if (value.startsWith('-')) {
            num = -num;
          }
        }
      }
  
      if (!isNaN(num)) {
        life10 = Math.min(Math.max(life10 + num, 0), maxLife10);
        lifeBar10.innerText = `${life10}/${maxLife10}`;
      }
    }
  });
  
  let life5 = 5;
  let maxLife5 = 5;

  // Adiciona um manipulador de clique para a barra de mana
  lifeBar5.addEventListener('click', () => {
    const newValue = prompt('Digite o novo valor da Mana Máxima:', maxLife5);
    if (newValue !== null) {
      maxLife5 = parseInt(newValue) || maxLife5;
      life5 = Math.min(life5, maxLife5);
      lifeBar5.innerText = `${life5}/${maxLife5}`;
    }
  });
  
  input5.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const value = input5.value;
      input5.value = '';
  
      let num = 0;
      if (value.includes('.')) {
        const [num1, num2] = value.split('.');
        num = parseInt(num1) * parseInt(num2);
        if (value.startsWith('-') && num2.startsWith('+')) {
          num = -num;
        }
      } else {
        num = parseInt(value);
        if (value.startsWith('+') || value.startsWith('-')) {
          num = parseInt(value.slice(1));
          if (value.startsWith('-')) {
            num = -num;
          }
        }
      }
  
      if (!isNaN(num)) {
        life5 = Math.min(Math.max(life5 + num, 0), maxLife5);
        lifeBar5.innerText = `${life5}/${maxLife5}`;
      }
    }
  });
  //inputdef e defbar
  let def = 0;
  let maxdef = 999;
  
  // Adiciona um manipulador de pressionar tecla para o campo de entrada de defesa/vida+
  inputdef.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const value = inputdef.value;
      inputdef.value = '';
  
      let num = 0;
      if (value.includes('.')) {
        const [num1, num2] = value.split('.');
        num = parseInt(num1) * parseInt(num2);
        if (value.startsWith('-') && num2.startsWith('+')) {
          num = -num;
        }
      } else {
        num = parseInt(value);
        if (value.startsWith('+') || value.startsWith('-')) {
          num = parseInt(value.slice(1));
          if (value.startsWith('-')) {
            num = -num;
          }
        }
      }
  
      if (!isNaN(num)) {
        def = Math.min(Math.max(def + num, 0), maxdef);
        defbar.innerText = `${def}`;
      }
    }
  });
}};