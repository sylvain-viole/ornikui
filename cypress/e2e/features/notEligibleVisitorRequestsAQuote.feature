Feature: As an not eligible visitor I cannot receive a quote

    Scenario: [002] not eligible visitor requests a quote
        Given a visitor not eligible to a quote
        When the visitor gives informations about his vehicle
        And the visitor gives informations about the primary driver
        And the visitor gives informations about the contract
        And the visitor reviews his informations
        And the visitor requests a quote
        Then the visitor does not receive a quote