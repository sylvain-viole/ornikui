Feature: As a visitor I can request a quote

    Scenario: [001] Visitor fills informations
        Given a visitor eligible to a quote
        When the visitor gives informations about his vehicle
        And the visitor gives informations about the primary driver
        And the visitor gives informations about the contract
        And the visitor reviews his informations
        And the visitor requests a quote
        Then the visitor receives quotes