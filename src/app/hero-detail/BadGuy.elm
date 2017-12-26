port module BadGuy exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)


port saveName : String -> Cmd msg


port names : (String -> msg) -> Sub msg


view : Model -> Html Msg
view model =
    label
        [ attribute "_ngcontent-c2" ""
        , class "elm-text"
        ]
        [ text "arch nemesis:"
        , input
            [ attribute "_ngcontent-c2" ""
            , class "elm-text"
            , value model.name
            , placeholder "badguy"
            , onInput NameChanged
            ] []
        ]


type alias Model =
    { name : String
    }


init : ( Model, Cmd Msg )
init =
    ( { name = "" }, Cmd.none )


type Msg
    = NameChanged String
    | NameReceived String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NameChanged newName ->
            ( { model | name = newName }, saveName newName )

        NameReceived theName ->
            ( { model | name = theName }, saveName theName )


main : Program Never Model Msg
main = Html.program
    { init = init, update = update, view = view, subscriptions = (\theModel -> names NameReceived) }
