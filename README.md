# galaHAL
A quick view to your bibliographic references in HAL

## HAL in brief
HAL is an acronym that stands for ["Hyper Articles en Ligne"](https://hal.archives-ouvertes.fr/). It is an open archive maintained by the CCSD (Centre pour la communication scientifique directe) where one can deposit scholarly documents or bibliographic references as well.

CCSD distributes several APIs to interact with ones data. This app implements them to provide a quick access to the bibliographic references.

## Features
galaHAL provides an access to ones bibliographic references registered in HAL. The references are listed by year and filtered by type of documents. This typology is defined by [a repository](https://api.archives-ouvertes.fr/ref/doctype). A search form makes it also possible to quickly filter the documents listed by a keyword. Finally, an anchor on the display links a bibliographic reference to its detailed record on the HAL website.

**Bootstrapped!** Under the hood, an instance of Bootstrap makes CSS customization easy. If you are familiar with the framework, you are just minutes away from displaying galaHAL on your personal web page accordingly to its graphic charter!

## Configuration
galaHAL is easy to configure. The file *config.js* at the root contains a small object with two keys:
- idHal: a unique HAL identifier, known as [idHAL](https://doc.archives-ouvertes.fr/identifiant-auteur-idhal-cv/)
- lab: the acronym of a structure, which you can find on the [*ad hoc* repository](https://api.archives-ouvertes.fr/ref/structure/?q=LLF&fl=acronym_s)

## Coming features
- direct access to documents when available
