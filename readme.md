# data-attribute-form-validator

Lib usada para validar campos de formulário ultilizando data-attributes.

## Como usar:

Importe o script no final do html

`<script src="./js/data-attribute-form-validator.js"></script>`

## Atributos:

 -  **data-validation:** *(String: name | phone | email | cep)*: Define qual o tipo de valor que o campo aceitará;
 -  **data-error:** *(String)*: Mensagem de erro que será exibida;

 ## Exemplos:

 ```
 <label for="email">
    <input id="email" type="text" placeholder="Email" name="email" data-validation="email" data-error="Por favor, insira o seu email.">
</label>
 ```

## Objeto global:

 `formErrors`
 
 Ao importar o script, será criado um objeto global que terá o nome dos formulários com erros contidos na página e os nomes dos campos que estiverem com erro.
