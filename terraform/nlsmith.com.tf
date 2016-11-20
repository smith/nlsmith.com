variable "aws_account_id" {
  description = "The AWS account ID"
}

resource "aws_iam_user" "www" {
  name = "www"
}

resource "aws_iam_user_policy" "www" {
  name = "www"
  user = "${aws_iam_user.www.name}"

  policy = <<EOF
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::${aws_s3_bucket.www.bucket}/*"
    },
    {
      "Action": "s3:ListAllMyBuckets",
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::*"
    }
  ]
}
EOF
}

resource "aws_s3_bucket" "www" {
  bucket = "nlsmith.com"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "404/index.html"
  }

  policy = <<EOF
{
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          "*"
        ]
      },
      "Resource": "arn:aws:s3:::nlsmith.com/*",
      "Action": "s3:GetObject"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${var.aws_account_id}:user/${aws_iam_user.www.name}"
      },
      "Resource": "arn:aws:s3:::nlsmith.com",
      "Action": "s3:*"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${var.aws_account_id}:user/${aws_iam_user.www.name}"
      },
      "Resource": "arn:aws:s3:::nlsmith.com/*",
      "Action": "s3:*"
    }
  ]
}
EOF
}
