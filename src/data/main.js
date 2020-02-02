export const main = {
    "main":`
        class Page
        class ChannelGroup
        class GenreGroup
        class Category
        class Genre

        Page --> "many" ChannelGroup : Contains
        Page --> "many" GenreGroup : Contains
        Category <|-- Genre : Inherits
        Genre "many" <|-- "many" Channel : Inherits
        ChannelGroup --> Content : Contains
        GenreGroup --> Content : Contains
        GenreGroup --> Genre : Contains

        Page : +int age
        Page : +String gender
        Page: +isMammal()
        Page: +mate()

        class ChannelGroup{
            +String beakColor
            +Channel channels
            +swim()
            +quack()
        }`,
    "Channel":`
        class Channel{
            +String: name
            +String: id
            +Animal: animal
        }
        
        Channel --> Animal : Contains
        `,
    "Sweeps":`
        class Page
        class Channel
        class Event

        Event --> Channel
        `,
    "Event":`
        class Event
        Event : +int age
        Event : +String gender
        Event: +isMammal()
        Event: +mate()`,
};