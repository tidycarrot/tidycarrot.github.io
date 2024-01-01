//https://pastebin.com/dSeaXeyG

#include <iostream>
#include <vector>
#include <string>
#include <cstring>
#include <random>
#include <cmath>
#include <math.h>
#include <cstdlib>

class fraction
{
  public:
	//public variables
	int numerator;
	int denominator;

	//constructors

	fraction(int num, int den = 1)
		: numerator{num}, denominator{den}
	{
		if (denominator == 0)
		{
			std::cerr << "Warning! Fraction denomimator cannot be zero\n";
		}
	}

	//functions

	void simplify()
	{
		int r = 1;
		int a = numerator;
		int b = denominator;
		if (a < 0 && b < 0)
		{
			numerator = abs(numerator);
			denominator = abs(denominator);
			a = abs(a);
			b = abs(b);
		}
		if (a % b == 0)
		{
			numerator /= b;
			denominator /= b;
		}
		else if (b % a == 0)
		{
			numerator /= a;
			denominator /= a;
		}
		else
		{
			while (a % b != 0)
			{
				r = a % b;
				a = b;
				b = r;
			}

			numerator /= r;
			denominator /= r;
		}
	}

	friend fraction operator+(const fraction &l, const int &r)
	{
		return fraction{l.numerator + (l.denominator * r), l.denominator};
	}
	friend fraction operator*(const fraction &l, const int &r)
	{
		return fraction{l.numerator * r, l.denominator};
	}
};

//operator overloading
//arithmetic operators

fraction operator*(const fraction &l, const fraction &r)
{
	return fraction(
		l.numerator * r.numerator,
		l.denominator * r.denominator);
}

fraction operator/(const fraction &l, const fraction &r)
{
	return fraction(
		l.numerator * r.denominator,
		l.denominator * r.numerator);
}

fraction operator+(const fraction &l, const fraction &r)
{
	return fraction(
		((l.numerator * r.denominator) + (r.numerator * l.denominator)),
		(l.denominator * r.denominator));
}

fraction operator-(const fraction &l, const fraction &r)
{
	return fraction(
		((l.numerator * r.denominator) - (r.numerator * l.denominator)),
		(l.denominator * r.denominator));
}

//Inequality operators

bool operator>(const fraction &l, const fraction &r)
{
	if (l.numerator * r.denominator > r.numerator * r.denominator)
	{
		return true;
	}
	else
	{
		return false;
	};
}

bool operator<(const fraction &l, const fraction &r)
{
	if (l.numerator * r.denominator < r.numerator * r.denominator)
	{
		return true;
	}
	else
	{
		return false;
	};
}

fraction simplified(const fraction frac)
{
	int r = 1;
	int a = frac.numerator;
	int b = frac.denominator;
	int num = frac.numerator;
	int den = frac.denominator;
	if (a < 0 && b < 0)
	{
		num = abs(num);
		den = abs(den);
		a = abs(a);
		b = abs(b);
	}
	if (a % b == 0)
	{
		return fraction(num / b, den / b);
	}
	else if (b % a == 0)
	{
		return fraction(num / a, den / a);
	}
	else
	{
		while (a % b != 0)
		{
			r = a % b;
			a = b;
			b = r;
		}

		return fraction(num / r, den / r);
	}
}

//input/output
std::ostream &
operator<<(std::ostream &out, fraction f)
{
	out << f.numerator << '/' << f.denominator;
	return out;
}

int main()
{
	int x, y, z;
	std::cin >> x >> y >> z;
	fraction b{y, z};
	b = b * x;
	b.simplify();
	std::cout << b;
	return 0;
}