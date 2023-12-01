window.addEventListener("load", main);
function main(){
    var userReviews = [
        { title: "Reseña 1", content: "Esta es mi primera reseña." },
        { title: "Reseña 2", content: "Esta es mi segunda reseña." }
      ];
    
      var communityReviews = [
        { user: "Usuario1", title: "Reseña A", content: "Una reseña de la comunidad." },
        { user: "Usuario2", title: "Reseña B", content: "Otra reseña de la comunidad." }
      ];
    
      // Función para mostrar las reseñas del usuario
      function displayUserReviews() {
        var userReviewsTable = document.getElementById("user-reviews-table").getElementsByTagName('tbody')[0];
        userReviewsTable.innerHTML = '';
    
        userReviews.forEach(function (review, index) {
          var row = userReviewsTable.insertRow();
          var titleCell = row.insertCell(0);
          var contentCell = row.insertCell(1);
          var actionsCell = row.insertCell(2);
    
          titleCell.textContent = review.title;
          contentCell.textContent = review.content;
    
          var editBtn = document.createElement("button");
          editBtn.className = "edit-btn";
          editBtn.textContent = "Editar";
          editBtn.onclick = function () {
            editReview(index);
          };
    
          var deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.textContent = "Eliminar";
          deleteBtn.onclick = function () {
            deleteReview(index);
          };
    
          actionsCell.appendChild(editBtn);
          actionsCell.appendChild(deleteBtn);
        });
      }
    
      // Función para mostrar las reseñas de la comunidad
      function displayCommunityReviews() {
        var communityReviewsTable = document.getElementById("community-reviews-table").getElementsByTagName('tbody')[0];
        communityReviewsTable.innerHTML = '';
    
        communityReviews.forEach(function (review) {
          var row = communityReviewsTable.insertRow();
          var userCell = row.insertCell(0);
          var titleCell = row.insertCell(1);
          var contentCell = row.insertCell(2);
    
          userCell.textContent = review.user;
          titleCell.textContent = review.title;
          contentCell.textContent = review.content;
        });
      }
    
      // Función para agregar una nueva reseña
      function addReview(event) {
        event.preventDefault();
    
        var titleInput = document.getElementById("title");
        var contentInput = document.getElementById("content");
    
        var newReview = {
          title: titleInput.value,
          content: contentInput.value
        };
    
        userReviews.push(newReview);
        displayUserReviews();
    
        // Limpiar el formulario después de agregar la reseña
        titleInput.value = "";
        contentInput.value = "";
      }
    
      // Función para editar una reseña existente
      function editReview(index) {
        var reviewToEdit = userReviews[index];
        var titleInput = prompt("Editar título:", reviewToEdit.title);
        var contentInput = prompt("Editar reseña:", reviewToEdit.content);
    
        if (titleInput !== null && contentInput !== null) {
          reviewToEdit.title = titleInput;
          reviewToEdit.content = contentInput;
          displayUserReviews();
        }
      }
    
      // Función para eliminar una reseña
      function deleteReview(index) {
        var confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta reseña?");
    
        if (confirmDelete) {
          userReviews.splice(index, 1);
          displayUserReviews();
        }
      }
    
      // Event listener para el formulario de agregar reseña
      document.getElementById("review-form").addEventListener("submit", addReview);
    
      // Mostrar las reseñas iniciales
      displayUserReviews();
      displayCommunityReviews();
    
      function searchUserReviews() {
        var input = document.getElementById('user-review-search');
        var filter = input.value.toLowerCase();
        var userReviewsTable = document.getElementById("user-reviews-table").getElementsByTagName('tbody')[0];
        var rows = userReviewsTable.getElementsByTagName('tr');
    
        for (var i = 0; i < rows.length; i++) {
          var title = rows[i].getElementsByTagName('td')[0];
          var content = rows[i].getElementsByTagName('td')[1];
    
          if (title || content) {
            var titleValue = title.textContent || title.innerText;
            var contentValue = content.textContent || content.innerText;
    
            if (titleValue.toLowerCase().indexOf(filter) > -1 || contentValue.toLowerCase().indexOf(filter) > -1) {
              rows[i].style.display = "";
            } else {
              rows[i].style.display = "none";
            }
          }
        }
      }
    
      // Mostrar las reseñas iniciales
      displayUserReviews();
      displayCommunityReviews();
}