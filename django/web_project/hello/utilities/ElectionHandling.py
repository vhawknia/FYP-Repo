class Election:
    def __init__(self, title, description, start_date, end_date, timezone,
                 candidates, voters, voters_dept):
        self.title = title
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.timezone = timezone
        self.candidates = candidates       
        self.voters = voters
        self.voters_dept = voters_dept
