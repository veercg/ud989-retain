(function(){

    var model = {
        init: function() {
            // If notes is being created for first time in localstorage
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes); // Converting Json string to Json variable
            data.push(obj);
            localStorage.notes = JSON.stringify(data); // Converting Json variable to Json string
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var controller = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                postedDate : Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                controller.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            controller.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        '<span class="note-date">' + new Date(note.postedDate).toDateString() + '</span>' +
                        note.content + 
                        
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    controller.init();
})();
