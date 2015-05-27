module Todos {
  export interface List {
    _id?: string;
    name?: string;
    incompleteCount?: number;
  }

  export interface CollectionLists extends Mongo.Collection<List> {
    defaultName(): string;
  }

  export var Lists = <CollectionLists>(new Mongo.Collection<List>('lists'));

  // Calculate a default name for a list in the form of 'List A'
  Lists.defaultName = function(): string {
    var nextLetter = 'A', nextName = 'List ' + nextLetter;
    while (Lists.findOne({name: nextName})) {
      // not going to be too smart here, can go past Z
      nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
      nextName = 'List ' + nextLetter;
    }

    return nextName;
  };

  export interface Todo {
    _id?: string;
    text?: string;
    checked?: boolean;
  }

  export var Todos = new Mongo.Collection<Todo>('todos');
}
