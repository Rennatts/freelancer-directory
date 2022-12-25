export interface AllReviewsPerFreelancer {
    _id: string;
    reviews: NewReviews[];
}

interface NewReviews {
    reviewText: string;
    postedBy: userData;
    _id: string;
    createdAt: Date;
}

interface userData{
    _id: string;
    name: string;
    surname: string;
}